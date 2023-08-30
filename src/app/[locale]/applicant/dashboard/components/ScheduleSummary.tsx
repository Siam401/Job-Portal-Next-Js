'use client';

import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import JobScheduleCard from './schedule/JobScheduleCard ';
import { getDashboardData } from '@/app/api/applicant/dashboard';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/features/modal.slice';
import ModalContainer from '@/components/ui/ModalConainer';

type ScheduleSummaryProps = {
  initialData: any;
};

type Schedule = {
  id: number;
  title: string;
  date: string;
  time: string;
  start: string;
  end: string;
};

const ScheduleSummary = ({ initialData }: ScheduleSummaryProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const dispatch = useDispatch();
  const [content, setContent] = useState<any>({});

  const { data: response, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => getDashboardData(),
    initialData: initialData,
  });

  const handleEventClick = (info: any) => {
    const event = info.event; // Get the clicked event object
    const date = new Date(event.start).getDate();
    const month = new Date(event.start).toLocaleString('default', {
      month: 'short',
    });
    const title = event.title;
    const time = new Date(event.start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const formattedInfo = `${date} ${month} - ${title} at: ${time}`;
    setContent({
      day: date,
      month,
      description: title,
      time,
    });

    dispatch(openModal(`Schedule-${1}`));

    console.log(formattedInfo);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (response?.success === false) {
    throw new Error((response?.message ?? '').toString());
  }

  const schedules = response.data?.events;

  return (
    <>
      <div className="bg-white shadow rounded-lg border border-[#E5E7EB] overflow-hidden scheduleTab">
        {/* section: tab button to toggle interview schedule */}
        <div className="bg-white">
          <div className="flex items-center w-full font-medium border-b">
            <TabView
              className="customTabHeader"
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              <TabPanel header="Interview Schedule" disabled></TabPanel>

              <TabPanel
                header={
                  <div className="flex flex-col w-full space-y-1">
                    <i className="fa fa-calendar"></i>
                    <span className="">Calendar</span>
                  </div>
                }
              >
                <div className="bg-white">
                  <Fullcalendar
                    plugins={[dayGridPlugin]}
                    initialView={'dayGridMonth'}
                    headerToolbar={{
                      start: 'today', // will normally be on the left. if RTL, will be on the right
                      center: 'title',
                      end: 'prev,next', // will normally be on the right. if RTL, will be on the left
                    }}
                    height={'500px'}
                    events={schedules}
                    eventClick={(info) => handleEventClick(info)}
                  />
                </div>
              </TabPanel>
              <TabPanel
                header={
                  <div className="flex flex-col w-full space-y-1">
                    <i className="fa fa-calendar-days"></i>
                    <span className="">Schedule List</span>
                  </div>
                }
              >
                <div className="h-full p-0">
                  <div className="p-2 h-[500px] overflow-y-auto bg-[#f2f3f8] space-y-2">
                    {schedules.map((schedule: Schedule) => (
                      <JobScheduleCard
                        key={schedule.id}
                        day={schedule.date.split(' ')[0]}
                        month={schedule.date.split(' ')[1]}
                        description={schedule.title}
                        time={schedule.time}
                        // href={schedule.href}
                      />
                    ))}
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
      <ModalContainer
        id="Schedule-1"
        className="w-[520px] h-[auto] rounded-[10px] bg-white "
        maskClassName="!bg-gray-900/50"
        headerClassName="!p-1"
        content={
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex flex-col items-center h-[46px] w-[56px]">
              <h1 className="text-[24px] text-[#023161] font-extrabold text-center">
                {content.day}
              </h1>
              <span className="text-[22px] text-[#023161] font-base leading-[10px]">
                {content.month}
              </span>
            </div>
            <div className="w-full px-3 pb-2 pt-3 space-y-2 mt-1">
              <h3 className="text-[#5d5d5d] text-[18px] font-semibold leading-[18px]">
                {content.description}
              </h3>
              <h3 className="text-[#023161] text-[16px] font-semibold">
                Interview schedule at: {content.time}
              </h3>
            </div>
          </div>
        }
      />
    </>
  );
};

export default ScheduleSummary;
