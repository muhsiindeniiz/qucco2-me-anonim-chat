import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from './tag-input.style'; // Import your stylesheet
import {Tag} from './tag-input.type';
import {getTags} from '../../module/profile/query/setting';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import useStayLoggedin from '../../utils/useStayLoggedin';

interface TagInputProps {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({tags: propsTags, onChange}) => {
  const [currentInput, setCurrentInput] = useState('');
  const [tags, setTags] = useState<Tag[]>(propsTags ?? []);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const inputRef = useRef<TextInput>(null);
  const tagList = useSelector((state: RootState) => state.auth.tags);
  const id = useStayLoggedin();

  const handleInputChange = (text: string) => {
    setCurrentInput(text.toLowerCase());
    const lowerCaseInput = text.toLowerCase();
    if (tagList) {
      const filtered = tagList.filter(tag =>
        tag.label.toLowerCase().includes(lowerCaseInput),
      );
      setFilteredTags(filtered);
    }
  };

  const handleAddTag = (tag: Tag) => {
    if (tag.label.trim() === '') {
      return;
    }
    const newTag: Tag = {id: Math.random().toString(), label: tag.label.trim()};
    if (!tags.find(t => t.label.toLowerCase() === newTag.label.toLowerCase())) {
      setTags([newTag, ...tags]);
      setCurrentInput('');
      onChange([newTag, ...tags]);
    }
  };

  const handleRemoveTag = (tag: Tag) => {
    const updatedTags = tags.filter(t => t.id !== tag.id);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  const handleSelectTag = (tag: Tag) => {
    handleAddTag(tag);
  };

  const renderSelectedTag = ({item: tag}: {item: Tag}) => (
    <View style={styles.selectedTag}>
      <Text style={styles.selectedTagLabel}>#{tag.label}</Text>
      <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
        <IonIcons name="close" size={16} style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderSuggestionTag = ({item: tag}: {item: Tag}) => (
    <TouchableOpacity onPress={() => handleSelectTag(tag)}>
      <View style={styles.suggestionTag}>
        <Text style={styles.suggestionTagLabel}>#{tag.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.tagLists}>
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            placeholder="Add a tag"
            placeholderTextColor="#666"
            value={currentInput}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddTag({id: '', label: currentInput})}>
            <IonIcons name="add" size={16} style={styles.closeIcon} />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View>
          {currentInput.length > 0 && (
            <FlatList
              data={filteredTags}
              renderItem={renderSuggestionTag}
              keyExtractor={item => item.id}
              style={styles.suggestionsList}
            />
          )}
        </View>
      </View>

      <View style={styles.selectedTagsContainer}>
        <Text style={styles.tagsTitle}>MY TAGS</Text>
        <FlatList
          data={tags}
          renderItem={renderSelectedTag}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default TagInput;
