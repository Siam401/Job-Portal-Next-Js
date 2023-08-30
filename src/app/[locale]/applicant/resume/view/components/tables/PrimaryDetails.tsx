'use client';

type PrimaryDetailsProps = { basic: any };

const PrimaryDetails = ({ basic }: PrimaryDetailsProps) => {
  return (
    <>
      <table
        width="750"
        cellSpacing="0"
        cellPadding="0"
        border={0}
        align="center"
      >
        <tbody>
          <tr>
            <td colSpan={6}>
              <table width="100%" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td
                      width="73%"
                      valign="bottom"
                      height=""
                      style={{
                        color: '#222',
                        fontSize: '20px',
                        fontWeight: 900,
                      }}
                    >
                      {basic?.name || ''}
                    </td>
                    <td rowSpan={2} width="27%" valign="bottom" align="right">
                      {/* <!--Photograph:--> */}
                      <table
                        width="140"
                        style={{ height: 140 }}
                        cellSpacing="7"
                        cellPadding="0"
                      >
                        <tbody>
                          <tr>
                            <td width="126" valign="middle" height="135">
                              {basic?.photo || '' ? (
                                <img
                                  // src={basic?.photo || ''}
                                  src="https://images.pexels.com/photos/65894/peacock-pen-alluring-yet-lure-65894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                  style={{
                                    width: '124px',
                                    height: '135px',
                                    objectFit: 'cover',
                                  }}
                                />
                              ) : null}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td
                      valign="middle"
                      align="left"
                      style={{ lineHeight: '1.5' }}
                    >
                      <div>
                        <span style={{ marginRight: '5px' }}>Address:</span>
                        {basic?.address || ''}
                      </div>
                      <div>
                        <span style={{ marginRight: '5px' }}>
                          Primary Mobile No:
                        </span>
                        {basic?.primary_mobile || ''}
                      </div>
                      <div>
                        <span style={{ marginRight: '5px' }}>
                          Secondary Mobile No:
                        </span>
                        {basic?.secondary_mobile || ''}
                      </div>
                      <div>
                        <span style={{ marginRight: '5px' }}>
                          Primary Email:
                        </span>
                        {basic?.email || ''}
                      </div>
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

export default PrimaryDetails;
