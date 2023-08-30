'use client';

type ExperienceProps = {
  total_experience: any;
  experiences: any[];
};

const Experience = ({ total_experience, experiences }: ExperienceProps) => {
  const employmentHistory =
    experiences && experiences.length > 0 ? experiences : [];

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
                Employment History:
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
                wordBreak: 'break-word',
              }}
              className="BDJNormalText01"
              align="left"
            >
              <strong>Total Year of Experience :</strong> {total_experience} yrs
            </td>
          </tr>
        </tbody>
      </table>

      {employmentHistory.map((item, index) => (
        <table
          key={index}
          style={{ marginTop: '3px', lineHeight: '17px' }}
          width="750"
          cellSpacing="0"
          cellPadding="0"
          border={0}
          align="center"
        >
          <tbody>
            <tr>
              <th
                style={{
                  paddingLeft: '5px',
                  marginBottom: '10px',
                  verticalAlign: 'top',
                }}
                align="center"
              >
                {index + 1}.
              </th>
              <th
                colSpan={6}
                style={{
                  paddingBottom: '10px',
                  wordBreak: 'break-word',
                  marginBottom: '10px',
                }}
                align="left"
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>
                    {item.designation} ({item.total_years})
                  </span>
                  <span style={{ fontWeight: 'normal' }}>
                    ({item.start_month} -{' '}
                    {item.end_month ? item.end_month : 'continuing'})
                  </span>
                </div>
              </th>
            </tr>
            <tr>
              <td align="center"></td>
              <td
                colSpan={6}
                style={{
                  paddingBottom: '10px',
                  wordBreak: 'break-word',
                  marginBottom: '10px',
                }}
                align="left"
              >
                <div>
                  <strong>{item.company_name}</strong>
                </div>
                <div>
                  <span>{item.company_address}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center"></td>
              <td
                colSpan={6}
                style={{
                  paddingBottom: '10px',
                  wordBreak: 'break-word',
                  marginBottom: '10px',
                }}
                align="left"
              >
                <div>
                  <strong>Area of Expertise</strong>
                </div>
                <div>
                  <span>{item.expertise}</span>
                </div>
                <br />
                <strong>Duties/Responsibilities</strong>

                <div
                  className="res-editor"
                  dangerouslySetInnerHTML={{ __html: item.responsibility }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
};

export default Experience;
