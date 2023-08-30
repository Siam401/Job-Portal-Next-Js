'use client';
type ApplicationInformationProps = { career: any };

const ApplicationInformation = ({ career }: ApplicationInformationProps) => {
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
                Career and Application Information:
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
                width="100%"
                cellSpacing={0}
                cellPadding={0}
                border={0}
                align="center"
              >
                <tbody>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="32%" align="left">
                      Looking For
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="66%" align="left">
                      {career?.job_level || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="32%" align="left">
                      Available For
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="66%" align="left">
                      {career?.job_type || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="32%" align="left">
                      Present Salary
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="66%" align="left">
                      {career?.present_salary
                        ? `Tk. ${career?.present_salary}`
                        : ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="32%" align="left">
                      Expected Salary
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="66%" align="left">
                      {career?.expected_salary
                        ? `Tk. ${career?.expected_salary}`
                        : ''}
                    </td>
                  </tr>
                  {/* Preferred Job Category: */}
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="32%" align="left">
                      Preferred Job Category
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="66%" align="left">
                      {career?.preferred_functions || ''}
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

export default ApplicationInformation;
