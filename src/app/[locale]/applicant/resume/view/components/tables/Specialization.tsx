'use client';
type SpecializationProps = { specialization: any };

const Specialization = ({ specialization }: SpecializationProps) => {
  if (
    !specialization ||
    !specialization.fields ||
    specialization.fields.length === 0
  ) {
    return null;
  }

  let { fields, description } = specialization;

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
                Specialization:
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
                style={{ border: '1px solid #666666', wordBreak: 'break-word' }}
                width="100%"
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
                        borderBottom: '1px solid #666666',
                      }}
                      width="40%"
                      align="center"
                    >
                      <strong style={{}}>Fields of Specialization</strong>
                    </td>
                    <td
                      style={{
                        borderBottom: '1px solid #666666',
                      }}
                      width="60%"
                      align="center"
                    >
                      <strong style={{}}>Description</strong>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        borderRight: '1px solid #666666',
                      }}
                      width="40%"
                      align="left"
                    >
                      <ul style={{ paddingLeft: '25px' }}>
                        {fields.map((field: any, index: number) => (
                          <li key={index}>{field.skill}</li>
                        ))}
                      </ul>
                    </td>
                    <td style={{}} width="60%" align="center">
                      {description}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Specialization;
