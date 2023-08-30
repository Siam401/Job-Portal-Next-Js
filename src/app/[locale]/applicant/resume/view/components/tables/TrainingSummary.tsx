'use client';
type TrainingSummaryProps = { trainings: any[] };

const TrainingSummary = ({ trainings }: TrainingSummaryProps) => {
  if (!trainings || trainings.length === 0) {
    return null;
  }
  const education = trainings;

  return (
    <>
      <table
        style={{
          marginTop: '3px',
          // pageBreakInside: 'avoid',
          // pageBreakAfter: 'always',
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
                Training Summary:
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
                      width="15%"
                      align="center"
                    >
                      <strong style={{}}>Training Title</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="18%"
                      align="center"
                    >
                      <strong style={{}}>Topic</strong>
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
                      width="12%"
                      align="center"
                    >
                      <strong style={{}}>Country</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="15%"
                      align="center"
                    >
                      <strong style={{}}>Location</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="10%"
                      align="center"
                    >
                      <strong style={{}}>Year</strong>
                    </td>
                    <td style={{}} width="15%" align="center">
                      <strong style={{}}>Duration</strong>
                    </td>
                  </tr>

                  {education.map((item, index) => {
                    // prettier-ignore
                    const { title, topic, institute, country, duration, location, year, } = item;

                    return (
                      <tr key={index}>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="15%"
                          align="center"
                        >
                          {title ? title : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                            paddingLeft: '1px',
                          }}
                          width="15%"
                          align="center"
                        >
                          {topic ? topic : '.'}
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
                          width="15%"
                          align="center"
                        >
                          {country ? country : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="15%"
                          align="center"
                        >
                          {location ? location : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="10%"
                          align="center"
                        >
                          {year ? year : '.'}
                        </td>
                        <td
                          style={{
                            borderTop: '1px solid #666666',
                          }}
                          width="15%"
                          align="center"
                        >
                          {duration ? duration : '.'}
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

export default TrainingSummary;
