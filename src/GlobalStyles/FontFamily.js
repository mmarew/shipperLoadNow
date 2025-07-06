const fontFamily = {
  manropeBold: 'Manrope-Bold',
  manropeExtraBold: 'Manrope-ExtraBold',
  manropeExtraLight: 'Manrope-ExtraLight',
  manropeLight: 'Manrope-Light',
  manropeMedium: 'Manrope-Medium',
  manropeRegular: 'Manrope-Regular',
  manropeSemiBold: 'Manrope-SemiBold',
};

export default fontFamily;
import {DefaultTheme} from 'react-native-paper';
// unused theme
export const paperTheme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    // Default font for most text
    regular: {
      fontFamily: fontFamily.manropeRegular,
      fontWeight: 'normal', // Important for custom fonts
    },
    // Medium is used for labels (e.g., TextInput labels)
    medium: {
      fontFamily: fontFamily.manropeMedium,
      fontWeight: 'normal',
    },
    // Bold variant (if needed)
    bold: {
      fontFamily: fontFamily.manropeBold,
      fontWeight: 'normal',
    },
  },
  // Customize TextInput appearance globally
  components: {
    TextInput: {
      // Style for the input text (content)
      contentStyle: {
        fontFamily: fontFamily.manropeRegular,
      },
      // Style for the label
      labelStyle: {
        fontFamily: fontFamily.manropeMedium,
      },
      // Style for the outline
      outlineStyle: {
        borderWidth: 1,
      },
    },
  },
};
