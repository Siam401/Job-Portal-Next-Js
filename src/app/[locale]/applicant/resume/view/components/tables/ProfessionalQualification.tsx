'use client';
type ProfessionalQualificationProps = {
  certifications: any[];
};

const ProfessionalQualification = ({
  certifications,
}: ProfessionalQualificationProps) => {
  if (!certifications || certifications.length === 0) {
    return null;
  }
  const qualifications = certifications;

  return (
    <>
      <table
        style={{ marginTop: '3px' }}
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
                Professional Qualification:
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
                      width="25%"
                      align="center"
                    >
                      <strong style={{}}>Certification</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="25%"
                      align="center"
                    >
                      <strong style={{}}>Institute</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="25%"
                      align="center"
                    >
                      <strong style={{}}>Location</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="12.5%"
                      align="center"
                    >
                      <strong style={{}}>From</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="12.5%"
                      align="center"
                    >
                      <strong style={{}}>To</strong>
                    </td>
                  </tr>

                  {qualifications.map((qualification, index) => {
                    const { title, institute, location, from_date, to_date } =
                      qualification;

                    return (
                      <tr key={index}>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="25%"
                          align="center"
                        >
                          {title ? title : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="25%"
                          align="center"
                        >
                          {institute ? institute : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="25%"
                          align="center"
                        >
                          {location ? location : '.'}
                        </td>
                        <td
                          style={{
                            borderRight: '1px solid #666666',
                            borderTop: '1px solid #666666',
                          }}
                          width="12.5%"
                          align="center"
                        >
                          {from_date ? from_date : '.'}
                        </td>
                        <td
                          style={{
                            borderTop: '1px solid #666666',
                          }}
                          width="12.5%"
                          align="center"
                        >
                          {to_date ? to_date : '.'}
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

export default ProfessionalQualification;
