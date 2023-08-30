'use client';
type AcademicQualificationProps = {
  educations: any[];
};

const AcademicQualification = ({ educations }: AcademicQualificationProps) => {
  if (!educations || educations.length === 0) {
    return null;
  }

  const qualifications = educations;

  return (
    <>
      <table
        style={{
          marginTop: '3px',
        }}
        width="750"
        cellSpacing="0"
        cellPadding="0"
        border={0}
        align="center"
      >
        <tbody>
          <tr>
            <td
              colSpan={6}
              style={{
                background: '#E6E6E6',
                fontWeight: 'bold',
                paddingLeft: '10px',
                width: '750px',
              }}
            >
              <span
                style={{
                  borderBottom: '1px solid',
                  fontSize: '14px',
                }}
              >
                Academic Qualification:
              </span>
            </td>
          </tr>
          <tr>
            <td
              colSpan={6}
              style={{
                paddingLeft: '5px',
                paddingTop: '7px',
                paddingBottom: '10px',
              }}
              align="left"
            >
              <table
                style={{ border: '1px solid #666666', wordBreak: 'break-word' }}
                width="100%"
                cellSpacing="0"
                cellPadding="0"
                border={0}
                align="center"
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="20%"
                      align="center"
                    >
                      <strong style={{}}>Exam Title</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="15%"
                      align="center"
                    >
                      <strong style={{}}>Concentration/Major</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="15%"
                      align="center"
                    >
                      <strong style={{}}>Institute</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="12.5%"
                      align="center"
                    >
                      <strong style={{}}>Result</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="12.5%"
                      align="center"
                    >
                      <strong style={{}}>Pas.Year</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="10%"
                      align="center"
                    >
                      <strong style={{}}>Duration</strong>
                    </td>
                    <td style={{}} width="15%" align="center">
                      <strong style={{}}>Achievement</strong>
                    </td>
                  </tr>

                  {qualifications.map((qualification, index) => {
                    // prettier-ignore
                    const { degree, major, institute, result, passing_year, duration, achievement, } = qualification;
                    return (
                      <tr key={index}>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="20%"
                          align="center"
                        >
                          {degree}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="15%"
                          align="center"
                        >
                          {major ? major : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="15%"
                          align="center"
                        >
                          {institute ? institute : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="12.5%"
                          align="center"
                        >
                          {result ? result : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="12.5%"
                          align="center"
                        >
                          {passing_year ? passing_year : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="10%"
                          align="center"
                        >
                          {duration ? duration : '.'}
                        </td>
                        <td
                          style={{
                            borderTop: '1px solid #666666',
                          }}
                          width="15%"
                          align="center"
                        >
                          {achievement ? achievement : '.'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AcademicQualification;
