import {en} from './en';
import {tr} from './tr';
import LocalizedStrings from 'react-native-localization';
import * as RNLocalize from 'react-native-localize';
let locale = RNLocalize.getLocales()[0].languageCode;
locale !== 'en' && locale !== 'tr' ? (locale = 'en') : (locale = locale);
let strings = new LocalizedStrings({en, tr});
strings.setLanguage(locale);
export default strings;
