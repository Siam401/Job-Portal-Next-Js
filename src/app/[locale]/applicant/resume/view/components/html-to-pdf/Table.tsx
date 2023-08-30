'use client';

import { StyleSheet, View, Text } from '@react-pdf/renderer';

type TableProps = {
  tableHeader: string[];
  data: any;
  columnWidths: number[];
};

const Table = ({ data, tableHeader, columnWidths }: TableProps) => {
  const headerToPropertyMap: Record<string, string> = {
    'Training Title': 'title',
    Topic: 'topic',
    Institute: 'institute',
    Country: 'country',
    Location: 'location',
    Year: 'year',
    Duration: 'duration',

    'Exam Title': 'degree',
    'Concentration/Major': 'major',
    Result: 'result',
    'Pas.Year': 'passing_year',
    Achievement: 'achievement',
    From: 'from_date',
    To: 'to_date',
    Certification: 'title',

    Language: 'language',
    Reading: 'reading',
    Speaking: 'speaking',
    Writing: 'writing',
  };

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {tableHeader.map((header, headerIndex) => (
          <View
            style={{
              ...styles.tableHeaderCol,
              width: `${columnWidths[headerIndex]}%`,
              fontFamily: 'Helvetica-Bold',
            }}
            key={headerIndex}
          >
            <Text>{header}</Text>
          </View>
        ))}
      </View>

      {data.map((row: any, index: number) => (
        <View style={styles.tableRow} key={index}>
          {tableHeader.map((header, headerIndex) => (
            <View
              style={{
                ...styles.tableCol,
                width: `${columnWidths[headerIndex]}%`,
              }}
              key={headerIndex}
            >
              <Text>
                {row[headerToPropertyMap[header]] !== undefined &&
                row[headerToPropertyMap[header]] !== null
                  ? row[headerToPropertyMap[header]]
                  : '.'}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'column',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableCol: {
    padding: 5,
    textAlign: 'center',
    fontSize: 8,
    height: '100%',
    borderRightWidth: 1,
    borderColor: 'black',
    display: 'flex',
    vAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeaderCol: {
    fontSize: 10,
    borderRightWidth: 1,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Table;
