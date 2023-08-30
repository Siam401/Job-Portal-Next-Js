'use client';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

type EmploymentHistoryProps = {
  total_experience: any;
  experiences: any[];
};

const EmploymentHistory = ({
  total_experience,
  experiences,
}: EmploymentHistoryProps) => {
  const employmentHistory =
    experiences && experiences.length > 0 ? experiences : [];

  const convertRichTextToReactPDF = (richText: string) => {
    const segments = richText.split(/(<\/?[a-zA-Z0-9-]+[^>]*>)/g);

    let currentStyle: any = {}; // To keep track of current inline styles
    const reactPdfComponents: any[] = [];

    segments.forEach((segment, index) => {
      if (segment.startsWith('<strong>')) {
        currentStyle = { ...currentStyle, fontFamily: 'Helvetica-Bold' };
        segment = segment.replace(/<\/?strong>/g, '');
      } else if (segment.startsWith('</strong>')) {
        currentStyle = { ...currentStyle, fontFamily: 'Helvetica' };
        return;
      } else if (segment.startsWith('<u>')) {
        currentStyle = { ...currentStyle, textDecoration: 'underline' };
        segment = segment.replace(/<\/?u>/g, '');
      } else if (segment.startsWith('</u>')) {
        currentStyle = { ...currentStyle, textDecoration: 'none' };
        return;
      } else if (segment.startsWith('<em>')) {
        if (currentStyle.fontFamily === 'Helvetica-Bold') {
          currentStyle = {
            ...currentStyle,
            fontFamily: 'Helvetica-BoldOblique',
          };
        } else {
          currentStyle = { ...currentStyle, fontFamily: 'Helvetica-Oblique' };
        }
        segment = segment.replace(/<\/?em>/g, '');
      } else if (segment.startsWith('</em>')) {
        if (currentStyle.fontFamily === 'Helvetica-BoldOblique') {
          currentStyle = { ...currentStyle, fontFamily: 'Helvetica-Bold' };
        } else {
          currentStyle = { ...currentStyle, fontFamily: 'Helvetica' };
        }
        return;
      } else if (segment.startsWith('<span style="color:')) {
        const match = segment.match(/color: (.*?);/);
        if (match) {
          currentStyle = { ...currentStyle, color: match[1] };
        }
        segment = segment.replace(/<\/?span[^>]+>/g, '');
      } else if (segment.startsWith('<span style="background-color:')) {
        const match = segment.match(/background-color: (.*?);/);
        if (match) {
          currentStyle = { ...currentStyle, backgroundColor: match[1] };
        }
        segment = segment.replace(/<\/?span[^>]+>/g, '');
      } else if (segment === '</span>') {
        currentStyle = {};
        return;
      } else if (segment.startsWith('<li>')) {
        segment = segment.replace(/<li>/g, '');
        if (index !== 0 && index !== segments.length - 1) {
          reactPdfComponents.push('\n');
        }
        reactPdfComponents.push(
          <Text key={index} style={currentStyle}>
            {'\u2022'} {segment}
          </Text>,
        );
        if (index !== 0 && index !== segments.length - 1) {
          reactPdfComponents.push('');
        }
        return;
      } else if (segment.startsWith('<p>')) {
        segment = segment.replace(/<p>/g, '');
      } else if (segment.startsWith('</p>')) {
        segment = segment.replace(/<\/p>/g, '\n');
        reactPdfComponents.push(
          <Text key={index} style={currentStyle}>
            {segment}
          </Text>,
        );
        return;
      }

      segment = segment.replace(/<\/?[a-zA-Z0-9-]+[^>]*>/g, '');

      reactPdfComponents.push(
        <Text
          key={index}
          style={{
            ...currentStyle,
            marginTop: 0,
          }}
        >
          {segment}
        </Text>,
      );
      // reactPdfComponents.push('\n');
    });

    return reactPdfComponents;
  };

  return (
    <>
      <View>
        <View style={styles.sectionHeader}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>
            Employment History:
          </Text>
        </View>
        <View style={styles.sectionText}>
          <Text>Total Year of Experience : {total_experience} yrs</Text>
        </View>
      </View>

      {employmentHistory.map((item: any, index: number) => (
        <View key={index} style={styles.container}>
          <View>
            <Text style={styles.index}>{index + 1}.</Text>
          </View>
          <View style={styles.contentColumn}>
            <View style={styles.section}>
              <Text style={styles.title}>
                {item.designation} ({item.total_years})
              </Text>
              <Text style={styles.content}>
                {item.start_month} -{' '}
                {item.end_month ? item.end_month : 'continuing'}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.content}>{item.company_name}</Text>
              <Text style={styles.content}>{item.company_address}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Area of Expertise</Text>
              <Text style={styles.content}>{item.expertise}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Duties/Responsibilities</Text>
              <Text>
                {convertRichTextToReactPDF(item.responsibility as string)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: '#E6E6E6',
    fontSize: 11,
    fontWeight: 400,
    textDecoration: 'underline',
    padding: 5,
  },
  sectionText: {
    fontSize: 10,
    padding: 5,
    lineHeight: 1.5,
  },
  container: {
    flexDirection: 'row',
  },
  index: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 10,
  },
  contentColumn: {
    fontSize: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 900,
  },
  content: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  underline: {
    textDecoration: 'underline',
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default EmploymentHistory;
