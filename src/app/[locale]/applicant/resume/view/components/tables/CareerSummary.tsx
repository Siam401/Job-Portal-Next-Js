'use client';
type CareerSummaryProps = {
  summary: any;
};

const CareerSummary = ({ summary }: CareerSummaryProps) => {
  if (!summary || summary.length === 0) {
    return null;
  }

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
                Career Summary:
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
              align="left"
            >
              {summary}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CareerSummary;
