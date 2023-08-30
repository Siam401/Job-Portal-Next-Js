'use client';
type PersonalDetailsProps = { personal: any };

const PersonalDetails = ({ personal }: PersonalDetailsProps) => {
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
                Personal Details:
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
                style={{ wordBreak: 'break-word' }}
                width="100%"
                cellSpacing={0}
                cellPadding={0}
                border={0}
                align="center"
              >
                <tbody>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="22%" align="left">
                      Father&rsquo;s Name
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="76%" align="left">
                      {personal?.father_name || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="22%" align="left">
                      Mother&rsquo;s Name
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="76%" align="left">
                      {personal?.mother_name || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="22%" align="left">
                      Date of Birth
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="76%" align="left">
                      {personal?.dob || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="22%" align="left">
                      Gender
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="76%" align="left">
                      {personal?.gender || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="22%" align="left">
                      Height (Meter)
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="76%" align="left">
                      {personal?.height || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="22%" align="left">
                      Weight (Kg)
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="76%" align="left">
                      {personal?.weight || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} width="22%" align="left">
                      Marital Status
                    </td>
                    <td width="2%" align="center">
                      :
                    </td>
                    <td width="76%" align="left">
                      {personal?.marital_status || ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} align="left">
                      Nationality
                    </td>
                    <td align="center">:</td>
                    <td align="left">{personal?.nationality || ''}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} align="left">
                      National Id No.
                    </td>
                    <td align="center">:</td>
                    <td align="left">{personal?.nid || ''}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} align="left">
                      Religion
                    </td>
                    <td align="center">:</td>
                    <td align="left">{personal?.religion || ''}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} align="left">
                      Permanent Address
                    </td>
                    <td align="center">:</td>
                    <td align="left">{personal?.permanent_address || ''}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} align="left">
                      Current Location
                    </td>
                    <td align="center">:</td>
                    <td align="left">{personal?.present_address || ''}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: 5 }} align="left">
                      Disability ID
                    </td>
                    <td align="center">:</td>
                    <td align="left">{personal?.disability_id || ''}</td>
                  </tr>
                  <tr>
                    <td colSpan={6}></td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      style={{ paddingLeft: 5, fontSize: 12 }}
                      align="left"
                    ></td>
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

export default PersonalDetails;
