'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import CaptureArea from '../elements/CaptureArea';
import BrowseComponent from '../elements/BrowseComponent';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { photoSchema } from '../../validators/photo.schema';
import { checkEmpty, dataURLtoFile } from '@/services/Utility';
import { useAppDispatch } from '@/redux/hook';
import { toastActions } from '@/redux/features/toast.slice';
import PhotoApi from '@/app/api/user/photo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserDetail } from '@/app/api/applicant/layout';
import ConfirmDialogue from '@/components/ui/ConfirmDialog';
import { closeModal, openModal } from '@/redux/features/modal.slice';
import { useSession } from 'next-auth/react';
import Loading from '../../../components/Loader';

export default function PhotoComponent() {
  const dispatch = useAppDispatch();
  const photoRef = useRef<any>(null);
  const queryClient = useQueryClient();

  const { data: session, update: updateSession }: any = useSession();
  const { data: userInfo, isLoading: isUserLoading }: any = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetail(),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(photoSchema),
  });

  const [visible, setVisible] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDeleteDisable, setIsDeleteDisable] = useState<boolean>(false);
  const [devices, setDevices] = useState([]);
  const videoConstraints = {
    width: 300,
    height: 300,
  };

  const handleDevices = useCallback(
    (mediaDevices: any) =>
      setDevices(mediaDevices.filter(({ kind }: any) => kind === 'videoinput')),
    [setDevices],
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    if (!selectedFile) {
      if (photoRef.current) {
        photoRef.current.value = null;
      }

      return;
    }
    setValue('photo', selectedFile);
    setProfileImageUrl(null);
    const objectUrl: any = URL.createObjectURL(selectedFile);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!checkEmpty(errors)) {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: String(errors.photo?.message),
        }),
      );
    }
  }, [errors]);

  useEffect(() => {
    if (!checkEmpty(userInfo?.data) && !checkEmpty(userInfo.data.user.photo)) {
      const photoUrl = userInfo.data.user.photo;

      setProfileImageUrl(photoUrl);
      setIsDeleteDisable(false);
    } else {
      setIsDeleteDisable(true);
    }
  }, [userInfo]);

  async function sessionUpdate() {
    await updateSession({
      ...session,
      user: userInfo.data.user,
    });
  }

  useEffect(() => {
    if (!checkEmpty(userInfo)) {
      if (userInfo.success) {
        if (!checkEmpty(userInfo.data)) {
          sessionUpdate();
        }
      }
    }
  }, [userInfo]);

  const onSubmit = async (formData: any) => {
    setLoading(true);
    formData._method = 'put';
    const { message, success } = await PhotoApi.saveUserPhoto(formData);
    if (success) {
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['resume_status']);
      updateSession();
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: String(message),
        }),
      );
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: String(message),
        }),
      );
    }
    setLoading(false);
  };

  const reFresh = () => {
    updateSession();
    queryClient.invalidateQueries(['user']);
    queryClient.invalidateQueries(['resume_status']);
    setSelectedFile(null);
    setProfileImageUrl(null);
  };

  const handleDelete = async () => {
    const { message, success } = await PhotoApi.deleteUserPhoto();
    if (success) {
      reFresh();
      dispatch(
        toastActions.showToast({
          type: 'success',
          summary: 'Success',
          message: String(message),
        }),
      );
    } else {
      dispatch(
        toastActions.showToast({
          type: 'error',
          summary: 'Error',
          message: String(message),
        }),
      );
    }
    dispatch(closeModal(`delete-photo`));
  };

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-4">
        <div className="my-3">
          <div className="relative flex items-center">
            <h3 className="w-full py-1 mb-3 text-[23px] font-bold text-[#111928] border-b-2 border-[#d9d9d9]">
              Photograph
            </h3>
          </div>
          <div className="relative w-[470px] mx-auto max-w-full mt-2">
            <BrowseComponent
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setProfileImageUrl={setProfileImageUrl}
              videoConstraints={videoConstraints}
              photoRef={photoRef}
              profileImageUrl={profileImageUrl}
            />

            <Button
              className="my-1 block col-start-4 rounded-lg w-full px-5 py-2.5 text-center"
              severity='warning'
              label="Take Photo"
              onClick={() => setVisible(true)}
              disabled={devices.length == 0 ? true : false}
            />
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Button
                  severity='danger'
                  type="button"
                  className="my-1 block rounded-lg w-full px-5 py-2.5 text-center"
                  onClick={() => dispatch(openModal(`delete-photo`))}
                  label="Delete"
                  disabled={isDeleteDisable}
                />
              </div>
              <div className="col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button
                    className="my-1 block rounded-lg w-full px-5 py-2.5 text-center"
                    label="Save"
                    severity='success'
                    loading={isLoading}
                    disabled={selectedFile === null}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CaptureArea
        visible={visible}
        setVisible={setVisible}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        photoRef={photoRef}
      />
      <ConfirmDialogue id={`delete-photo`} handleDelete={handleDelete} />
    </>
  );
}
