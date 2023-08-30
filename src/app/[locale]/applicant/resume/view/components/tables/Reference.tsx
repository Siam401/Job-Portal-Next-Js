type ReferenceProps = { references: any };

interface ReferenceData {
  label: string;
  value1: string;
  value2: string;
}

function Reference({ references }: ReferenceProps) {
  if (!references || references.length === 0) {
    return null;
  }

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
                Reference (s):
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
                    <td width="22%" align="left"></td>
                    <td width="2%" align="center"></td>
                    <td
                      style={
                        references.length === 2
                          ? { borderRight: '1px solid #666666' }
                          : {}
                      }
                      width="35%"
                      align="left"
                    >
                      <u>Reference: 01</u>
                    </td>
                    {references.length === 2 ? (
                      <td style={{ paddingLeft: 15 }} width="41%" align="left">
                        <u>Reference: 02</u>
                      </td>
                    ) : null}
                  </tr>

                  {referenceData.map((data, index) => (
                    <tr key={index}>
                      <td style={{ paddingLeft: 5 }} width="22%" align="left">
                        {data.label}
                      </td>
                      <td width="2%" align="center">
                        :
                      </td>
                      <td
                        style={
                          references.length === 2
                            ? { borderRight: '1px solid #666666' }
                            : {}
                        }
                        width="35%"
                        align="left"
                      >
                        {data.value1}
                      </td>
                      <td style={{ paddingLeft: 10 }} width="41%" align="left">
                        {data.value2}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td align="left"></td>
                    <td align="center"></td>
                    <td colSpan={2} align="left"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Reference;
