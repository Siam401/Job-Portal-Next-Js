'use client';

import pdfSVG from '@/assets/icons/applicant/pdf.svg';
import {
  Document,
  Font,
  PDFDownloadLink,
  Image as PDFImage,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Table from './html-to-pdf/Table';
import EmploymentHistory from './html-to-pdf/EmploymentHistory';

type DownloadPdfProps = { resumeData: any };

const DownloadPdf = ({ resumeData }: DownloadPdfProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // prettier-ignore
  const { basic, personal, total_experience, experiences, educations, trainings, certifications, specialization, languages, references, career, } = resumeData.data as any;
  const data = resumeData.data;

  const { career_objective, career_summary, special_qualification } = basic;

  const referenceData = [
    {
      label: 'Name',
      value1: references[0]?.name || '',
      value2: references[1]?.name || '',
    },
    {
      label: 'Organization',
      value1: references[0]?.organization || '',
      value2: references[1]?.organization || '',
    },
    {
      label: 'Designation',
      value1: references[0]?.designation || '',
      value2: references[1]?.designation || '',
    },
    {
      label: 'Address',
      value1: references[0]?.address || '',
      value2: references[1]?.address || '',
    },
    {
      label: 'Phone (Off.)',
      value1: references[0]?.phone_office || '',
      value2: references[1]?.phone_office || '',
    },
    {
      label: 'Phone (Res.)',
      value1: references[0]?.phone_home || '',
      value2: references[1]?.phone_home || '',
    },
    {
      label: 'Mobile',
      value1: references[0]?.mobile || '',
      value2: references[1]?.mobile || '',
    },
    {
      label: 'E-Mail',
      value1: references[0]?.email || '',
      value2: references[1]?.email || '',
    },
    {
      label: 'Relation',
      value1: references[0]?.relation || '',
      value2: references[1]?.relation || '',
    },
  ];

  return (
    <>
      {isClient ? (
        <PDFDownloadLink
          document={
            <MyDocument
              data={data}
              experiences={experiences}
              educations={educations}
              trainings={trainings}
              certifications={certifications}
              career={career}
              personal={personal}
              referenceData={referenceData}
              references={references}
              languages={languages}
              specialization={specialization}
            />
          }
          fileName="resume.pdf"
        >
          {({ blob, url, loading, error }: any) => (
            <Image src={pdfSVG} alt="pdf" priority />
          )}
        </PDFDownloadLink>
      ) : null}

      {isClient ? (
        <PDFViewer width={1000} height={400}>
          <MyDocument
            data={data}
            experiences={experiences}
            educations={educations}
            trainings={trainings}
            certifications={certifications}
            career={career}
            personal={personal}
            referenceData={referenceData}
            references={references}
            languages={languages}
            specialization={specialization}
          />
        </PDFViewer>
      ) : null}
    </>
  );
};

const MyDocument = ({
  data,
  experiences,
  trainings,
  educations,
  certifications,
  career,
  personal,
  references,
  referenceData,
  languages,
  specialization,
}: any) => (
  <Document>
    <Page
      size={'A4'}
      style={{
        ...styles.page,
        fontFamily: 'Helvetica',
      }}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data?.basic.name}</Text>
          <View style={styles.detailContainer}>
            <View style={styles.detailRow}>
              <Text>Address: {data.basic.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text>Primary Mobile No: {data.basic.primary_mobile}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text>Secondary Mobile No: {data.basic.secondary_mobile}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text>Primary Email: {data.basic.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.photoContainer}>
          <PDFImage
            style={styles.photo}
            src={
              'https://images.pexels.com/photos/65894/peacock-pen-alluring-yet-lure-65894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
          />
          {/* {data.basic.photo ? (
              ) : (
                <PDFImage style={styles.photo} src={wordSVG} />
              )} */}
        </View>
      </View>
      {/* section: Career Objective */}
      {!data.basic.career_objective ||
      data.basic.career_objective.length === 0 ? null : (
        <View>
          <View style={styles.sectionHeader}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>
              Career Objective:
            </Text>
          </View>
          <View style={styles.sectionText}>
            <Text>{data.basic.career_objective}</Text>
          </View>
        </View>
      )}
      {/* section: Career Summary */}
      {!data.basic.career_summary ||
      data.basic.career_summary.length === 0 ? null : (
        <View>
          <View style={styles.sectionHeader}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>
              Career Summary:
            </Text>
          </View>
          <View style={styles.sectionText}>
            <Text>{data.basic.career_summary}</Text>
          </View>
        </View>
      )}
      {/* section: Special Qualification */}
      {!data.basic.special_qualification ||
      data.basic.special_qualification.length === 0 ? null : (
        <View>
          <View style={styles.sectionHeader}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>
              Special Qualification:
            </Text>
          </View>
          <View style={styles.sectionText}>
            <Text>{data.basic.special_qualification}</Text>
          </View>
        </View>
      )}
      {/* section: Employment History */}
      <EmploymentHistory
        experiences={experiences}
        total_experience={data.total_experience}
      />
      {/* section: Academic Qualification */}
      {!educations || educations.length === 0 ? null : (
        <View>
          <View
            style={{
              marginBottom: 6,
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                Academic Qualification:
              </Text>
            </View>
          </View>
          <Table
            data={educations}
            tableHeader={[
              'Exam Title',
              'Concentration/Major',
              'Institute',
              'Result',
              'Pas.Year',
              'Duration',
              'Achievement',
            ]}
            columnWidths={[20, 15, 15, 12.5, 12.5, 10, 15]}
          />
        </View>
      )}

      {/* section: training summary */}
      {!trainings || trainings.length === 0 ? null : (
        <View>
          <View
            style={{
              marginBottom: 6,
              marginTop: 6,
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                Training Summary:
              </Text>
            </View>
          </View>
          <Table
            data={trainings}
            tableHeader={[
              'Training Title',
              'Topic',
              'Institute',
              'Country',
              'Location',
              'Year',
              'Duration',
            ]}
            columnWidths={[15, 18, 15, 12, 15, 10, 15]}
          />
        </View>
      )}

      {/* section: professional qualification */}
      {!certifications || certifications.length === 0 ? null : (
        <View>
          <View
            style={{
              marginBottom: 6,
              marginTop: 6,
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                Professional Qualification:
              </Text>
            </View>
          </View>
          <Table
            data={certifications}
            tableHeader={[
              'Certification',
              'Institute',
              'Location',
              'From',
              'To',
            ]}
            columnWidths={[25, 25, 25, 12.5, 12.5]}
          />
        </View>
      )}
      {/* section: Career and Application Information */}
      <View>
        <View
          style={{
            marginBottom: 6,
            marginTop: 6,
          }}
        >
          <View style={styles.sectionHeader}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>
              Career and Application Information:
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingLeft: 5,
            paddingTop: 7,
            paddingBottom: 10,
            fontSize: 10,
          }}
        >
          {renderRow('Looking For', career?.job_level || '', '32%')}
          {renderRow('Available For', career?.job_type || '', '32%')}
          {renderRow(
            'Present Salary',
            career?.present_salary ? `Tk. ${career?.present_salary}` : '',
            '32%',
          )}
          {renderRow(
            'Expected Salary',
            career?.expected_salary ? `Tk. ${career?.expected_salary}` : '',
            '32%',
          )}
          {renderRow(
            'Preferred Job Category',
            career?.preferred_functions || '',
            '32%',
          )}
        </View>
      </View>

      {/* section: Specialization: */}
      {!specialization ||
      !specialization.fields ||
      specialization.fields.length === 0 ? null : (
        <View>
          <View
            style={{
              marginBottom: 6,
              marginTop: 6,
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                Specialization:
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingLeft: 5,
              paddingTop: 7,
              paddingBottom: 10,
              fontSize: 10,
              width: '100%',
            }}
          >
            <View
              style={{
                border: '1px solid #666666',
                width: '100%',
                alignItems: 'flex-start',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    width: '40%',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Helvetica-Bold',
                    }}
                  >
                    Fields of Specialization
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: '60%',
                    alignItems: 'center',
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Helvetica-Bold',
                    }}
                  >
                    Description
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    width: '40%',
                    padding: 5,
                  }}
                >
                  <View style={{ paddingLeft: 25 }}>
                    {specialization.fields.map((field: any, index: number) => (
                      <Text key={index}>{field.skill}</Text>
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    width: '85%',
                    padding: 5,
                  }}
                >
                  <Text>{specialization.description}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {/* section: Language Proficiency */}
      {!languages || languages.length === 0 ? null : (
        <View>
          <View
            style={{
              marginBottom: 6,
              marginTop: 6,
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                Language Proficiency:
              </Text>
            </View>
          </View>
          <Table
            data={languages}
            tableHeader={['Language', 'Reading', 'Writing', 'Speaking']}
            columnWidths={[25, 25, 25, 25]}
          />
        </View>
      )}

      {/* section: Personal Details  */}
      <View>
        <View
          style={{
            marginBottom: 6,
            marginTop: 6,
          }}
        >
          <View style={styles.sectionHeader}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>
              Personal Details:
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 5,
              paddingTop: 7,
              paddingBottom: 10,
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                width: '100%',
                fontSize: 10,
              }}
            >
              {renderRow('Father’s Name', personal?.father_name || '', '22%')}
              {renderRow('Mother’s Name', personal?.mother_name || '', '22%')}
              {renderRow('Date of Birth', personal?.dob || '', '22%')}
              {renderRow('Gender', personal?.gender || '', '22%')}
              {renderRow('Height (Meter)', personal?.height || '', '22%')}
              {renderRow('Weight (Kg)', personal?.weight || '', '22%')}
              {renderRow(
                'Marital Status',
                personal?.marital_status || '',
                '22%',
              )}
              {renderRow('Nationality', personal?.nationality || '', '22%')}
              {renderRow('National Id', personal?.national_id || '', '22%')}
              {renderRow('Religion', personal?.religion || '', '22%')}
              {renderRow(
                'Permanent Address',
                personal?.permanent_address || '',
                '22%',
              )}
              {renderRow(
                'Current Location',
                personal?.current_location || '',
                '22%',
              )}
              {renderRow('Disability ID', personal?.disability_id || '', '22%')}
            </View>
          </View>
        </View>
      </View>
      {/* section: Reference (s) */}
      {!references || references.length === 0 ? null : (
        <View>
          <View
            style={{
              marginBottom: 6,
              marginTop: 6,
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                Reference (s):
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingLeft: 5,
              paddingTop: 7,
              paddingBottom: 10,
              width: '100%',
              fontSize: 10,
            }}
          >
            <View
              style={{
                width: '100%',
                alignItems: 'flex-start',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '22%' }}></Text>
                <Text style={{ width: '2%', textAlign: 'center' }}></Text>
                <Text style={{ width: '35%', textDecoration: 'underline' }}>
                  Reference: 01
                </Text>
                {references.length === 2 ? (
                  <Text style={{ paddingLeft: 15, width: '41%' }}>
                    Reference: 02
                  </Text>
                ) : null}
              </View>

              {referenceData.map((data: any, index: number) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingLeft: 5, width: '22%' }}>
                    {data.label}
                  </Text>
                  <Text style={{ width: '2%', textAlign: 'center' }}>: </Text>
                  <Text
                    style={{
                      width: references.length === 2 ? '35%' : '76%',
                      textDecoration: 'underline',
                    }}
                  >
                    {data.value1}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      width: '41%',
                      textDecoration: 'underline',
                    }}
                  >
                    {data.value2}
                  </Text>
                </View>
              ))}

              <View style={{ flexDirection: 'row' }}>
                <Text></Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ paddingLeft: 5, fontSize: 12 }}></Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Page>
  </Document>
);

const renderRow = (label: string, value: string, labelWidth: string) => (
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ paddingLeft: 5, width: labelWidth }}>{label}</Text>
    <Text style={{ width: '2%', textAlign: 'center' }}>: </Text>
    <Text style={{ width: '100%' }}>{value || ''}</Text>
  </View>
);

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    paddingBottom: 10,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#023B75',
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },
  detailContainer: {
    textAlign: 'left',
    lineHeight: 1.5,
  },
  detailRow: {
    lineHeight: 1.5,
    color: '#000',
    fontSize: 10,
    fontWeight: 400,
  },
  photoContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  photo: {
    width: 90,
    height: 100,
    objectFit: 'cover',
    objectPosition: 'center',
  },

  border: {
    borderBottom: '1px solid #000000',
  },
  sectionHeader: {
    backgroundColor: '#E6E6E6',
    fontSize: 11,
    fontWeight: 900,
    textDecoration: 'underline',
    padding: 5,
  },
  sectionText: {
    fontSize: 10,
    padding: 5,
    lineHeight: 1.5,
  },
  row: {
    display: 'flex',
  },
  index: {
    paddingLeft: 5,
    marginBottom: 10,
  },
  position: {
    paddingBottom: 10,
    marginBottom: 10,
  },
  normal: {
    fontWeight: 'normal',
  },
  companyLocation: {
    paddingBottom: 10,
    marginBottom: 10,
  },
  company: {
    fontWeight: 'bold',
  },
  location: {
    marginLeft: 5,
  },
  expertise: {
    paddingBottom: 10,
    marginBottom: 10,
  },
  strong: {
    fontWeight: 'bold',
  },
  expertiseText: {
    marginLeft: 5,
  },
});

export default DownloadPdf;
