import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Colors} from '../Constants/Color';

import {Form, Item, Label, Input, Button, Icon} from 'native-base';

import ItemPicker from '../Components/ItemPicker';

import propTypes from 'prop-types';

import shortid from 'shortid';

import {connect} from 'react-redux';
import {addWorkout} from '../store/actions/workout';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const AddWorkoutScreen = ({navigation, addWorkout}) => {
  const [name, setName] = useState();
  const [type, setType] = useState('Gym');
  const [target, setTarget] = useState('General Fitness');
  const [level, setLevel] = useState('Beginner');
  const [daysType, setDaysType] = useState('Weekly');
  const [muscleGroup, setMuscleGroup] = useState('Full Body');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            paddingHorizontal: 15,
          }}
          onPress={() => handleSubmit()}>
          <Icon
            name="checkmark-sharp"
            style={{
              fontSize: responsiveFontSize(3),
              color: Colors.secondary,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, name, type, target, level, daysType, muscleGroup]);

  const handleSubmit = async () => {
    try {
      if (!name || !type || !target || !level || !daysType || !muscleGroup) {
        return alert('Fill all the fields');
      }
      const workoutToAdd = {
        id: shortid(),
        name,
        imageUrl: Math.floor(Math.random() * Math.floor(14)),
        type,
        level,
        target,
        daysType,
        muscleGroup,
        workoutStatus: {
          activeStatus: false,
          repetitionStatus: false,
          repetition: 0,
          shared: false,
          routineTracker: 0,
          finish: false,
        },
        workoutData: null,
      };

      await addWorkout(workoutToAdd);
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Assets/Images/Image.jpg')}
        style={{width: responsiveWidth(100), height: responsiveHeight(18)}}>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: responsiveFontSize(2.1),
            color: Colors.secondary,
            backgroundColor: Colors.primaryOpacity,
            fontWeight: 'bold',
          }}>
          CREATE YOUR WORKOUT
        </Text>
      </ImageBackground>
      <Text
        style={{
          fontSize: responsiveFontSize(1.7),
          fontWeight: 'bold',
          padding: 5,
          color: Colors.primary,
        }}>
        Workout Details
      </Text>
      <ScrollView>
        <Form>
          <Item stackedLabel last>
            <Label style={styles.inputStyle}>Workout Name</Label>
            <Input
              placeholder="E.g., (Strength Training, Summer Plan)"
              placeholderTextColor={'#c1c1c1'}
              style={styles.inputStyle}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </Item>
          <ItemPicker
            placeHolder="Workout Target"
            data={[
              {label: 'General Fitness', value: 'General Fitness'},
              {label: 'Bulking', value: 'Bulking'},
              {label: 'Cutting', value: 'Cutting'},
              {label: 'Strength', value: 'Strength'},
              {label: 'Sport Specific', value: 'Sport Specific'},
            ]}
            selectedValue={target}
            setSelectedValue={setTarget}
          />
          <ItemPicker
            placeHolder="Workout Type"
            data={[
              {label: 'Gym Workout', value: 'Gym'},
              {label: 'Home Workout', value: 'Home'},
            ]}
            selectedValue={type}
            setSelectedValue={setType}
          />
          <ItemPicker
            placeHolder="Difficulty Level"
            data={[
              {label: 'Beginner', value: 'Beginner'},
              {label: 'Intermediate', value: 'Intermediate'},
              {label: 'Advanced', value: 'Advanced'},
            ]}
            selectedValue={level}
            setSelectedValue={setLevel}
          />
          <ItemPicker
            placeHolder="Days Type"
            data={[
              {label: 'Weekly -E.g., Monday,Tuesday,....', value: 'Weekly'},
              {label: 'Numarical -E.g., Day 1,Day 2.....', value: 'Days'},
            ]}
            selectedValue={daysType}
            setSelectedValue={setDaysType}
          />

          <ItemPicker
            placeHolder="Main Muscle Target"
            data={[
              {label: 'Full Body', value: 'Full Body'},
              {label: 'Chest', value: 'Chest'},
              {label: 'Core', value: 'Core'},
              {label: 'Arms', value: 'Arms'},
              {label: 'Shoulder', value: 'Shoulder'},
              {label: 'Back', value: 'Back'},
              {label: 'Legs', value: 'Legs'},
            ]}
            selectedValue={muscleGroup}
            setSelectedValue={setMuscleGroup}
          />
        </Form>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  addWorkout: (data) => addWorkout(data),
};

AddWorkoutScreen.propTypes = {
  addWorkout: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddWorkoutScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(256,256,256,0.9)',
    flex: 1,
  },
  inputStyle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(1.7),
  },
});
