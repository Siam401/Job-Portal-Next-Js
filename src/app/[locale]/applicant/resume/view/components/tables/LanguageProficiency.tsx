'use client';
type LanguageProficiencyProps = { languages: any };

const LanguageProficiency = ({ languages }: LanguageProficiencyProps) => {
  if (!languages || languages.length === 0) {
    return null;
  }
  const languageData = languages;

  return (
    <>
      <table
        style={{ marginTop: '3px' }}
        width={750}
        cellSpacing={0}
        cellPadding={0}
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
                Language Proficiency:
              </span>
            </td>
          </tr>
          <tr>
            <td
              colSpan={6}
              style={{ paddingLeft: 5, paddingTop: 7, paddingBottom: 10 }}
              align="left"
            >
              <table
                style={{ border: '1px solid #666666' }}
                width={750}
                cellSpacing={0}
                cellPadding={0}
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
                      <strong style={{}}>Language</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="25%"
                      align="center"
                    >
                      <strong style={{}}>Reading</strong>
                    </td>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="25%"
                      align="center"
                    >
                      <strong style={{}}>Writing</strong>
                    </td>
                    <td style={{}} width="25%" align="center">
                      <strong style={{}}>Speaking</strong>
                    </td>
                  </tr>
                  {languageData.map((data: any, index: number) => (
                    <tr key={index}>
                      <td
                        style={{
                          borderRight: '1px solid #666666',
                          borderTop: '1px solid #666666',
                        }}
                        width="25%"
                        align="center"
                      >
                        {data.language}
                      </td>
                      <td
                        style={{
                          borderRight: '1px solid #666666',
                          borderTop: '1px solid #666666',
                        }}
                        width="25%"
                        align="center"
                      >
                        {data.reading}
                      </td>
                      <td
                        style={{
                          borderRight: '1px solid #666666',
                          borderTop: '1px solid #666666',
                        }}
                        width="25%"
                        align="center"
                      >
                        {data.writing}
                      </td>
                      <td
                        style={{
                          borderTop: '1px solid #666666',
                        }}
                        width="25%"
                        align="center"
                      >
                        {data.speaking}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default LanguageProficiency;
