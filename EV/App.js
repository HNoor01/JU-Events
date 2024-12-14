import React, { useState } from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Modal,SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 

const Stack = createStackNavigator();


function HomeScreen() {
  const navigation = useNavigation();
  const [hasNewNotifications, setHasNewNotifications] = useState(true); 

  const forYouEvents = [
    {
      id: '1',
   //   image: require('./assets/event1.jpg'),
      date: 'Monday, November 20, 2024 10:00 AM',
      title: 'Nursing Skills Workshop',
      facility: 'School of Nursing',
    },
  ];

  const universityWideEvents = [
    {
      id: '1',
     // image: require('./assets/event2.jpg'),
      date: 'Wednesday, November 22, 2024 12:00 PM',
      title: 'Business Innovation',
      facility: 'School Of Business',
    },
  ];

  return (
    <ScrollView contentContainerStyle={homeStyles.container}>
      <View style={homeStyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ zIndex: 1 }}>
          <Icon name="user-circle-o" size={35} style={homeStyles.userIcon} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={homeStyles.appName}>JUEvents</Text>
      </View>

      <View style={homeStyles.eventCategory}>
        <Text style={homeStyles.categoryTitle}>For You</Text>
        {forYouEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={homeStyles.eventItem}
            onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
          >
            <Image source={event.image} style={homeStyles.eventImage} />
            <Text style={homeStyles.eventDate}>{event.date}</Text>
            <Text style={homeStyles.eventTitle}>{event.title}</Text>
            <Text style={homeStyles.eventFacility}>{event.facility}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={homeStyles.eventCategory}>
        <Text style={homeStyles.categoryTitle}>University - Wide Events</Text>
        {universityWideEvents.map((event) => (
          <View key={event.id} style={homeStyles.eventItem}>
            <Image source={event.image} style={homeStyles.eventImage} />
            <Text style={homeStyles.eventDate}>{event.date}</Text>
            <Text style={homeStyles.eventTitle}>{event.title}</Text>
            <Text style={homeStyles.eventFacility}>{event.facility}</Text>
          </View>
        ))}
      </View>

      <View style={homeStyles.bottomIconContainer}>
        <TouchableOpacity
          style={homeStyles.iconButton}
          onPress={() => navigation.navigate('EventDetails')}
        >
          <Icon name="home" size={50} color="#00A54F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={homeStyles.iconButton}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <Icon name="plus-square" size={50} color="#00A54F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={homeStyles.iconButton}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Icon name="star" size={50} color="#00A54F" />
        </TouchableOpacity>

      
        <TouchableOpacity
          style={homeStyles.iconButton}
          onPress={() => {
            navigation.navigate('Notifications');
            setHasNewNotifications(false); 
          }}
        >
          <View>
            <Icon name="bell" size={50} color="#00A54F" />
            {hasNewNotifications && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
function FavoritesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('upcoming');
  const upcomingEvents = [
    {
      id: '1',
      title: 'Nursing Skills Workshop',
    },
  ];

  const pastEvents = [
    {
      id: '2',
      title: 'Business Innovation Seminar',
    },
  ];

  return (
    <ScrollView contentContainerStyle={favoritesstyles.container}>

      {/* Toggle buttons */}
      <View style={favoritesstyles.bottomTitle}>
        <TouchableOpacity
          style={[
            favoritesstyles.categoryButton,
            selectedCategory === 'upcoming' && favoritesstyles.selectedButton,
          ]}
          onPress={() => setSelectedCategory('upcoming')}
        >
          <Text style={favoritesstyles.buttonText}>Upcoming Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            favoritesstyles.categoryButton,
            selectedCategory === 'past' && favoritesstyles.selectedButton,
          ]}
          onPress={() => setSelectedCategory('past')}
        >
          <Text style={favoritesstyles.buttonText}>Past Events</Text>
        </TouchableOpacity>
      </View>

      {/* Events list */}
      <View style={favoritesstyles.eventCategory}>
        {selectedCategory === 'upcoming' &&
          upcomingEvents.map((event) => (
            <View key={event.id} style={favoritesstyles.eventItem}>
              <Text style={favoritesstyles.eventTitle}>{event.title}</Text>
              <Ionicons name="chevron-forward" size={24} color="#00A54F" />
            </View>
          ))}

        {selectedCategory === 'past' &&
          pastEvents.map((event) => (
            <View key={event.id} style={favoritesstyles.eventItem}>
              <Text style={favoritesstyles.eventTitle}>{event.title}</Text>
              <Ionicons name="chevron-forward" size={24} color="#00A54F" />
            </View>
          ))}
      </View>
    </ScrollView>
  );
}


function ProfileScreen() {
  return (
    <View style={profileScreenStyles.container}>
      <View style={profileScreenStyles.header}>
        <View style={profileScreenStyles.profileIconContainer}>
          <Icon name="user-circle" size={80} color="#00A54F" />
        </View>
        <Text style={profileScreenStyles.userName}>Rayah AlRababah</Text>
      </View>
      <View style={profileScreenStyles.menuItems}>
        <TouchableOpacity style={profileScreenStyles.menuItem}>
          <Icon name="gear" size={20} color="#00A54F" />
          <Text style={profileScreenStyles.menuText}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileScreenStyles.menuItem}>
          <Icon name="bell" size={20} color="#00A54F" />
          <Text style={profileScreenStyles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileScreenStyles.menuItem}>
          <Icon name="database" size={20} color="#00A54F" />
          <Text style={profileScreenStyles.menuText}>Data and Storage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileScreenStyles.menuItem}>
          <Icon name="question-circle" size={20} color="#00A54F" />
          <Text style={profileScreenStyles.menuText}>Help & Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileScreenStyles.menuItem}>
          <Icon name="info-circle" size={20} color="#00A54F" />
          <Text style={profileScreenStyles.menuText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileScreenStyles.menuItem}>
          <Icon name="lock" size={20} color="#00A54F" />
          <Text style={profileScreenStyles.menuText}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileScreenStyles.menuItem}>
          <Icon name="sign-out" size={20} color="#00A54F" />
          <Text style={profileScreenStyles.menuText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(''); 
  const [eventImage, setEventImage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 

  const locations = ["Location 1", "Location 2", "Location 3"]; 

  const isWeekend = (selectedDate) => {
    const day = selectedDate.getDay();
    return day === 5 || day === 6; 
  };


  const isValidTime = (selectedTime) => {
    const selectedHour = selectedTime.getHours();
    return selectedHour >= 8 && selectedHour <= 15; 
  };

  const isPastDate = (selectedDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate < currentDate;
  };

  const isAtLeastTwoDaysAhead = (selectedDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const twoDaysLater = new Date(currentDate);
    twoDaysLater.setDate(currentDate.getDate() + 2);
    return selectedDate >= twoDaysLater;
  };

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Error: ', response.errorMessage);
      } else {
        setEventImage(response.assets[0].uri); 
      }
    });
  };

  const handleCreateEvent = () => {
    setFormSubmitted(true);
    if (!title || !date || !time || !location || !description) {
      alert('All fields are required.');
      return;
    }

    alert(
      `Event Created!\nTitle: ${title}\nDate: ${date.toDateString()} ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\nLocation: ${location}\nDescription: ${description}`
    );
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      if (isWeekend(selectedDate)) {
        alert('Cannot select Friday or Saturday');
        setDate(null);
      } else if (isPastDate(selectedDate)) {
        alert('Cannot select a past date. Please choose a future date.');
        setDate(null);
      } else if (!isAtLeastTwoDaysAhead(selectedDate)) {
        alert('Date must be at least 2 days ahead.');
        setDate(null);
      } else {
        setDate(selectedDate);
      }
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      if (!isValidTime(selectedTime)) {
        alert('Time must be between 8:00 AM and 3:00 PM');
        setTime(null);
      } else {
        setTime(selectedTime);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={CreateEventstyles.container}>
      <TouchableOpacity style={CreateEventstyles.imageUpload} onPress={handleImageUpload}>
        {eventImage ? (
          <Image source={{ uri: eventImage }} style={CreateEventstyles.imagePreview} />
        ) : (
          <Text style={CreateEventstyles.imageText}>Upload Event Picture</Text>
        )}
      </TouchableOpacity>

      <Text style={CreateEventstyles.label}>
        Event Title <Text style={CreateEventstyles.required}>* </Text>
        <Text style={CreateEventstyles.charCount}>
    {title.length} / 50
  </Text>
      </Text>
     
  <TextInput
    style={CreateEventstyles.input}
    placeholder="Event Title"
    value={title}
    onChangeText={setTitle}
    maxLength={50}
  />


      <Text style={CreateEventstyles.label}>
        Location <Text style={CreateEventstyles.required}>*</Text>
      </Text>
      <TouchableOpacity 
        style={[CreateEventstyles.input, formSubmitted && !location && CreateEventstyles.errorInput]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
  {location || 'Select Location'}
</Text>


      </TouchableOpacity>

      {/* Modal لعرض المواقع */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={CreateEventstyles.modalContainer}>
          <View style={CreateEventstyles.modalContent}>
            <FlatList
              data={locations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={CreateEventstyles.modalItem}
                  onPress={() => {
                    setLocation(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={CreateEventstyles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity style={CreateEventstyles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={CreateEventstyles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={CreateEventstyles.label}>
        Date <Text style={CreateEventstyles.required}>*</Text>
      </Text>
      <TouchableOpacity
        style={[CreateEventstyles.input, formSubmitted && !date && CreateEventstyles.errorInput, CreateEventstyles.dateInput]}
        onPress={() => setShowDatePicker(true)}
      >
      <Text style={{ textAlign: 'left', paddingTop: 10, paddingBottom: 10 }}>
  {date ? date.toDateString() : 'DD/MM/YYYY'}
</Text>

      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={CreateEventstyles.label}>
        Time <Text style={CreateEventstyles.required}>*</Text>
      </Text>
      <TouchableOpacity
        style={[CreateEventstyles.input, formSubmitted && !time && CreateEventstyles.errorInput, CreateEventstyles.timeInput]}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={{ textAlign: 'left', paddingTop: 10, paddingBottom: 10 }} >
          {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

<Text style={CreateEventstyles.label}>
  Description <Text style={CreateEventstyles.required}>* </Text>
  <Text style={CreateEventstyles.charCount}>
    {description.length} / 200
  </Text>
</Text>

<View>
  <TextInput
    style={CreateEventstyles.textArea}
    placeholder="Event Description"
    value={description}
    onChangeText={setDescription}
    maxLength={200}
    multiline
  />
</View>



      <View style={CreateEventstyles.buttonContainer}>
        <TouchableOpacity style={CreateEventstyles.createEventButton} onPress={handleCreateEvent}>
          <Text style={CreateEventstyles.createEventButtonText}>Add Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[CreateEventstyles.createEventButton, CreateEventstyles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={CreateEventstyles.createEventButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function NotificationsScreen() {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationPress = (notification) => {
    if (notification.type === 'response') {
      setSelectedNotification(notification); 
    } else {
      console.log('Navigating to event details for:', notification.eventTitle);
    }
  };

  return (
    <SafeAreaView style={  NotificationsScreenStyles.container}>
      <Text style={  NotificationsScreenStyles.headerText}>Your Notifications</Text>
      <ScrollView contentContainerStyle={  NotificationsScreenStyles.scrollContainer}>
        {notifications.map((notification) => (
          <TouchableOpacity 
            key={notification.id} 
            style={  NotificationsScreenStyles.notificationItem} 
            onPress={() => handleNotificationPress(notification)}
          >
            <Text style={  NotificationsScreenStyles.notificationTitle}>{notification.eventTitle}</Text>
            <Text style={  NotificationsScreenStyles.notificationMessage}>{notification.message}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedNotification && (
        <Modal 
          animationType="slide" 
          transparent={true} 
          visible={selectedNotification !== null}
          onRequestClose={() => setSelectedNotification(null)}
        >
          <View style={  NotificationsScreenStyles.modalView}>
            <Text style={  NotificationsScreenStyles.modalTitle}>{selectedNotification.eventTitle}</Text>
            <Text style={  NotificationsScreenStyles.modalMessage}>Status: {selectedNotification.status || 'Pending'}</Text>
            <Text style={  NotificationsScreenStyles.modalComment}>Comment: {selectedNotification.comment || 'No comment provided'}</Text>

            <TouchableOpacity 
              style={  NotificationsScreenStyles.closeButton} 
              onPress={() => setSelectedNotification(null)}
            >
              <Text style={  NotificationsScreenStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
function EventDetailsScreen({ route }) {
  const navigation = useNavigation();
  const title = 'Nursing Skill Workshop';
  const date = 'Nov 25, 2024';
  const facility = 'Faculty Of Nursing';
  const description = 'A workshop designed for nurses to enhance their skills in patient care.';
  const postedBy = 'Raya Yahya';
  const interestedCount = 17;
  const image = 'https://via.placeholder.com/400x200';

  const [selectedTab, setSelectedTab] = useState('Details');
  const [attendanceCode, setAttendanceCode] = useState('');
  const [isAttended, setIsAttended] = useState(false); // تم إضافة هذه السطر
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Talal Najada', rating: 5, text: 'Great workshop!' },
    { id: 2, name: 'Hashem Noor', rating: 4, text: 'Very informative and engaging, but busy.' },
  ]);

  const [interested, setInterested] = useState(false);
  

  const handleAttendanceSubmit = () => {
    if (attendanceCode === '1234') {
      setIsAttended(true); 
    } else {
    
      alert('Attendence Code is wrong!');
    }
  };

  return (
    <View style={styles.EventDetailsScreenContainer}>
      {/* Event Image and Title */}
      <Image source={{ uri: image }} style={styles.EventDetailsScreenEventImage} />
      <Text style={styles.header}>{title}</Text>

      {/* Tab Navigation */}
      <View style={styles.EventDetailsScreenTabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('Details')}>
          <Text style={selectedTab === 'Details' ? styles.activeTab : styles.inactiveTab}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Attendance')}>
          <Text style={selectedTab === 'Attendance' ? styles.activeTab : styles.inactiveTab}>Attended</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Reviews')}>
          <Text style={selectedTab === 'Reviews' ? styles.activeTab : styles.inactiveTab}>Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {selectedTab === 'Details' && (
        <View style={styles.EventDetailsScreenDetailsContainer}>
          {/* Display event details */}
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={20} color="#00a54f" />
            <Text style={styles.detailText}>{date}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={20} color="#00a54f" />
            <Text style={styles.detailText}>{facility}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="person-outline" size={20} color="#00a54f" />
            <Text style={styles.detailText}>Posted by: {postedBy}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="star-outline" size={20} color="#00a54f" />
            <Text style={styles.detailText}>{interestedCount} people are interested</Text>
          </View>

          <Text style={[styles.detailText, styles.descriptionHeader]}>Description:</Text>
          <Text style={styles.descriptionText}>{description}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#00a54f' }]}
              onPress={() => setInterested(!interested)} // تغيير الحالة عند الضغط
            >
              <Ionicons
                name={interested ? 'star' : 'star-outline'} // عرض النجمة حسب الحالة
                size={20}
                color="#fff"
              />
              <Text style={styles.actionButtonText}>Interested</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#00a54f' }]}>
              <Ionicons name="share-social-outline" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Attendance Tab */}
      {selectedTab === 'Attendance' && (
        <View style={styles.EventDetailsScreenAttendanceContainer}>
          {!isAttended ? (
            
            <>
              <Text style={styles.attendanceLabel}>Code:</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter code"
                value={attendanceCode}
                onChangeText={setAttendanceCode}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAttendanceSubmit} // عند الضغط على زر الإرسال
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.successText}>Successfully Attended</Text> // عند التحقق من الحضور
          )}
        </View>
      )}

      {/* Reviews Tab */}
      {selectedTab === 'Reviews' && (
  <View style={styles.EventDetailsScreenReviewContainer}>
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.reviewItem}>
          <Text style={styles.reviewText}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text> - {'⭐'.repeat(item.rating)}
          </Text>
          <Text>{item.text}</Text>
        </View>
      )}
    />

    {/* عرض زر إضافة التقييم فقط إذا كان المستخدم قد حضر الفعالية */}
    {isAttended ? (
      <TouchableOpacity
        style={styles.AddReviewButton}
        onPress={() => navigation.navigate('AddReviewScreen', { eventTitle: title })}
      >
        <Text style={styles.AddReviewButtonText}>Add Review</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[styles.AddReviewButton, { backgroundColor: '#ccc' }]} // تعطيل الزر
        disabled={true}
      >
        <Text style={styles.AddReviewButtonText}>You must attend the event to add a review</Text>
      </TouchableOpacity>
    )}
  </View>
)}

    </View>
  );
}

const notifications = [
  {
    id: '1',
    type: 'response', // Response notification
    eventTitle: 'Nursing Skills Workshop',
    message: 'Your request has been responded to',
    status: 'approved', // It could be approved or rejected
    comment: 'Event request has been approved!',
  },
  {
    id: '2',
    type: 'received', // Request received notification
    eventTitle: 'Business Innovation Seminar',
    message: 'Your request has been received',
    status: null,
    comment: '',
  },
  {
    id: '3',
    type: 'event_today', // Event today notification
    eventTitle: 'Nursing Skills Workshop',
    message: 'You have an event today',
    status: null,
    comment: '',
  },
  {
    id: '4',
    type: 'event_in_your_college', // Event in your college notification
    eventTitle: 'Tech Conference 2024',
    message: 'There is an event in your college today!',
    status: null,
    comment: '',
  }
];



function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      alert(`Username: ${username}\nPassword: ${password}`);
      navigation.navigate('Facilities');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <ScrollView contentContainerStyle={loginstyles.scrollContainer}>
      <View style={loginstyles.container}>
        <View style={loginstyles.header}>
         
          <Image
                        style={loginStyles.headerImage}
                        source={require('./assets/university-logo.png')}
                    />
          <Text style={[loginstyles.headerText, loginstyles.boldText]}>Welcome!</Text>
          <Text style={loginstyles.headerText}>Glad to See You!</Text>
        </View>

        <View style={loginstyles.loginForm}>
          <Text style={loginstyles.formText}>Username:</Text>
          <TextInput
            style={loginstyles.input}
            placeholder="Enter Username"
            onChangeText={setUsername}
            value={username}
          />
          <Text style={loginstyles.formText}>Password:</Text>
          <TextInput
            style={loginstyles.input}
            placeholder="Enter Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity style={loginstyles.button} onPress={handleLogin}>
            <Text style={loginstyles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('Forgot password clicked!')}>
            <Text style={loginstyles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function FacilitiesScreen({ navigation }) {
  const [selectedFacilities, setSelectedFacilities] = useState([]); // مصفوفة للاختيار المتعدد

  const facilities = [
    { id: '1', name: 'Nursing' },
    { id: '2', name: 'Sciences' },
    { id: '3', name: 'Sharia' },
    { id: '4', name: 'Medicine' },
    { id: '5', name: 'Arts' },
    { id: '6', name: 'Agriculture' },
    { id: '7', name: 'Pharmacy' },
    { id: '8', name: 'Physical Education' },
    { id: '9', name: 'IT' },
    { id: '10', name: 'Business' },
    { id: '11', name: 'Languages' },
    { id: '12', name: 'Engineering' },
    { id: '13', name: 'Archeology and Tourism' },
    { id: '14', name: 'Sports Sciences' },
    { id: '15', name: 'International Studies' },
    { id: '16', name: 'Educational Sciences' },
    { id: '17', name: 'Arts and Design' },
    { id: '18', name: 'Dental' },
    { id: '19', name: 'Rehabilitation Sciences' },
    { id: '20', name: 'Rights' },
  ];

  const handleFacilitySelect = (facility) => {
    // إذا كان العنصر موجودًا بالفعل، نقوم بإزالته، وإلا نضيفه إلى المصفوفة
    if (selectedFacilities.includes(facility.id)) {
      setSelectedFacilities(selectedFacilities.filter(id => id !== facility.id));
    } else {
      setSelectedFacilities([...selectedFacilities, facility.id]);
    }
  };

  return (
    <ScrollView contentContainerStyle={facilitiesstyles.container}>
      <Text style={facilitiesstyles.headerText}>Select the facilities you would prefer to receive notifications about.</Text>

      <FlatList
        data={facilities}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              facilitiesstyles.facilityItem,
              selectedFacilities.includes(item.id) && facilitiesstyles.selectedFacility, // إضافة النمط إذا كان العنصر مختار
            ]}
            onPress={() => handleFacilitySelect(item)}
          >
            <Text style={facilitiesstyles.facilityText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={facilitiesstyles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={facilitiesstyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const AddReviewScreen = ({ route,navigation }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);
  const maxLength = 80;  

  const { eventTitle } = route.params || {};
  // التعامل مع الضغط على النجوم
  const handleStarPress = (index) => {
    setRating(index);
  };

  const handleAddPhotos = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true, 
    });

    if (!result.cancelled) {
      setPhotos([...photos, ...result.selected]);
    }
  };

  
  const handleTextChange = (text) => {
    if (text.length <= maxLength) {
      setReviewText(text);
    }
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && rating > 0) {
      console.log({ reviewText, rating, photos });
      navigation.goBack();
    } else {
      alert('Please provide a rating and a review!');
    }
  };

  return (
    <View style={AddReviewScreenStyles.container}>
      <Text style={AddReviewScreenStyles.title}>
        {eventTitle ? eventTitle : 'No event title provided'}
      </Text>

      <View style={AddReviewScreenStyles.starsContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
            <Ionicons
              name={index <= rating ? 'star' : 'star-outline'}
              size={30}
              color={index <= rating ? '#ffd700' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={AddReviewScreenStyles.charCount}>
        {maxLength - reviewText.length} /80
      </Text>

      <TextInput
        style={AddReviewScreenStyles.input}
        placeholder="Write your review here..."
        value={reviewText}
        onChangeText={handleTextChange}  
        multiline
        maxLength={maxLength} 
      />

      

      {/* زر لإضافة الصور */}
      <TouchableOpacity style={AddReviewScreenStyles.addPhotoButton} onPress={handleAddPhotos}>
        <Text style={AddReviewScreenStyles.addPhotoText}>Add Photos</Text>
      </TouchableOpacity>

      {/* عرض الصور المضافة */}
      <View style={AddReviewScreenStyles.photosContainer}>
        {photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo.uri }} style={AddReviewScreenStyles.photo} />
        ))}
      </View>

      {/* زر إرسال التقييم */}
      <TouchableOpacity style={AddReviewScreenStyles.submitButton} onPress={handleSubmitReview}>
        <Text style={AddReviewScreenStyles.submitText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Facilities" component={FacilitiesScreen} />


        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="AddReviewScreen" component={AddReviewScreen} />








      </Stack.Navigator>
    </NavigationContainer>
  );
}
const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
    backgroundColor: '#00A54F',
    width: '112%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  userIcon: {
    width: 35,
    height: 35,
    position: 'left',
    left: -163,
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
  },
  eventCategory: {
    marginTop: '20%',
  },
  categoryTitle: {
    fontSize: 20,
    color: '#054A12',
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: '#00A54F',
    borderRadius: 10,
    marginBottom: 1,
    padding: 0,
  },
  eventImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  eventFacility: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  iconButton: {
    padding: 18,
  },
});


const profileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profileIconContainer: {
    width: 100, 
    height: 100,
    borderRadius: 50, 
    backgroundColor: '#EEEEEE',
    justifyContent: 'center', 
    alignItems: 'center',

    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,  
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'Arial', 
  },
  menuItems: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  menuIcon: {
    marginRight: 20,
    color: '#00A54F',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333333',
  },
});
const CreateEventstyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  required: {
    color: 'red',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100, 
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top', 
    borderRadius: 5, 
    marginBottom: 10, 
  },
  errorInput: {
    borderColor: 'red',
  },
  imageUpload: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imageText: {
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  createEventButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  createEventButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FF5733',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
  },
  dateInput: {
    textAlign: 'center',
  },
  timeInput: {
    textAlign: 'center',
  },
   inputStyle : {
    textAlign: 'left',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  charCount: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right', 
    marginBottom: 5,
  },
});
const NotificationsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A54F',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 100, 
  },
  notificationItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#555',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalMessage: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
  },
  modalComment: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: '#00A54F',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
});
const favoritesstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#00A54F',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  bottomTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  categoryButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#00A54F',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#00A54F',
  },
  buttonText: {
    color: '#054A12',
    fontWeight: 'bold',
  },
  eventCategory: {
    marginBottom: 30,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#00A54F',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#054A12',
  },
});

const loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A54F',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 20,
  },
  headerImage: {
    width: 120,
    height: 120,
  },
  headerText: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontSize: 30,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: "#FFFFFF",
  },
  loginForm: {
    width: '90%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  formText: {
    fontSize: 20,
    color: "#FFFFFF",
    marginVertical: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#054A12',
    fontSize: 18,
  },
  forgotPassword: {
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 200,
  },
});
const facilitiesstyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#00A54F',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  facilityItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    width: '45%',
    alignItems: 'center',
  },
  selectedFacility: {
    backgroundColor: '#aeb7b1',
  },
  facilityText: {
    color: '#054A12',
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#054A12',
    fontSize: 18,
  },
});
const EventDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#2a9d8f',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a9d8f',
    borderBottomWidth: 2,
    borderBottomColor: '#2a9d8f',
    paddingBottom: 5,
  },
  inactiveTab: {
    fontSize: 16,
    color: '#aaa',
    paddingBottom: 5,
  },
  detailsContainer: {
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
  attendedContainer: {
    padding: 20,
    alignItems: 'center',
  },
  attendanceLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewsContainer: {
    padding: 20,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
  addReviewButton: {
    backgroundColor: '#2a9d8f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addReviewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
const styles = StyleSheet.create({
  EventDetailsScreenContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    color: '#FFFFFF',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00a54f',
    textAlign: 'center',
    marginTop: 80, 
  
  },
  EventDetailsScreenEventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    color: '#FFFFFF',
  },
  eventDescription: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 1,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    color: '#00A54F',
  },
  EventDetailsScreenTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    color: '#00A54F',
  },
  inactiveTab: {
    fontSize: 16,
    color: '#00A54F',
  },
  EventDetailsScreenDetailsContainer: {
    fontSize: 20,
    color: '#00A54F',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#00A54F',
  },
  EventDetailsScreenAttendanceContainer: {
    fontSize: 20,
    color: '#00A54F',
    marginBottom: 10,

  },
  attendanceLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#00A54F',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#00A54F',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    color: '#333',
  },
  inputBoxPlaceholder: {
    color: '#aaa',
  },
  reviewContainer: {
    marginVertical: 16,
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewText: {
    fontSize: 16,
    color: '#00A54F',
    marginBottom: 16,
  },
  reviewRating: {
    fontSize: 14,
    color: '#00A54F',

  },
  EventDetailsScreenDetailsContainer: {
    padding: 16,
},
row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
detailText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
},
descriptionHeader: {
    marginTop: 16,
    fontWeight: 'bold',
},
descriptionText: {
    fontSize: 14,
    marginTop: 8,
    color: '#555',
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
},
actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
},
actionButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
},
row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
},
detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
},
descriptionHeader: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2a9d8f',
},
descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginVertical: 10,
},
interestedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a9d8f',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
},
interestedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
},

  AddReviewButton: {
    backgroundColor: '#00A54F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  AddReviewButtonText: {
    color: '#FFFFFF',
   // backgroundColor: '#00A54F',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#00A54F',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#00A54F', 
  },
  textInput: {
    height: 100,
    borderColor: '#00A54F',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: '#333',
  },
  addPhotoButton: {
    padding: 10,
    backgroundColor: '#00A54F',
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addPhotoText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#00A54F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const AddReviewScreenStyles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
  },
  starsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      fontSize: 16,
      minHeight: 100,
      textAlignVertical: 'top',
      marginBottom: 20,
  },
  addPhotoButton: {
      backgroundColor: '#00a54f',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
  },
  addPhotoText: {
      color: '#fff',
      fontSize: 16,
  },
  photosContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
  },
  photo: {
      width: 100,
      height: 100,
      marginRight: 10,
      marginBottom: 10,
      borderRadius: 8,
  },
  submitButton: {
      backgroundColor: '#00a54f',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
  },
  submitText: {
      color: '#fff',
      fontSize: 18,
  },
  charCount: {
    fontSize: 12,
    color: 'red',
    textAlign: 'right', 
    marginBottom: 5,
  }
});