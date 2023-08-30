'use client';
type CareerObjectiveProps = { objective: any };

const CareerObjective = ({ objective }: CareerObjectiveProps) => {
  if (!objective || objective.length === 0) {
    return null;
  }

  return (
    <>
      <table
        width="750"
        cellSpacing="0"
        cellPadding="0"
        border={0}
        align="center"
        style={{ verticalAlign: 'middle', marginTop: '20px' }}
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
                Career Objective:
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
              {objective}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CareerObjective;
