import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, FC, useEffect } from "react";
import styles from "./styles/profil.screen.styles";
import UpdatableTextInput from "../../components/UpdateableTextInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../src/redux/ReduxStore";
import { GetProfilesRequestModel } from "../../models/profiles/GetProfilesRequestModal";
import ProfileReducer from "../../src/redux/reducers/ProfileReducer";
import { PostProfilesRequestModel } from "../../models/profiles/PostProfilesRequestModel";

const comments = [
  {
    id: 3,
    name: "customer3:",
    content: "Thanks for sharing!",
    date: "2022-04-03",
  },
];

const ProfileManagementScreen: FC = () => {
  //TODO buradaki datalar login redux tarafından alınacak
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");


  //TODO onsubmit showSubmitButton göstersin ve email vs state güncellesin
  const dispatch = useDispatch<any>();

  const { profile } = useSelector((state: ApplicationState) => state.profileReducer)

  useEffect(() => {
    if (profile) {
      setPhone(profile!.data.attributes.phone_number);
      setEmail(profile!.data.attributes.email_address);
      setAddress(profile!.data.attributes.address);
    }
  }, [profile]);

  useEffect(() => {
    const request: GetProfilesRequestModel = {
      vendor_id: 1,
    };
    dispatch(ProfileReducer.getProfiles(request));
  }, []);

  const onSaveProfilePress = () => {
    console.log("tıklandı")
    const request: PostProfilesRequestModel = {
      email,
      phone,
      address
    };
    dispatch(ProfileReducer.putProfiles(request, 5));
  };

  return (
    <View style={styles.container}>
      {
        profile &&
        <View style={styles.avatar_container}>
          <TouchableOpacity>
            <View style={styles.avatar}>
              <Ionicons name="basket" size={60}></Ionicons>
            </View>
          </TouchableOpacity>
          <Text style={styles.profile_text}>{profile!.data.attributes.name}</Text>
          <Text style={styles.slogan_text}>
            "Buyer'de sadece %100 orijinal ürünleri bulabilirsiniz!"
          </Text>
        </View>
      }

      <View style={styles.info_container}>
        <View style={styles.email_container}>
          <Ionicons name="mail"></Ionicons>

          <UpdatableTextInput
            placeHolder="Email"
            onChangeText={setEmail}
            value={email}
          ></UpdatableTextInput>
        </View>

        <View style={styles.phone_container}>
          <Ionicons name="call"></Ionicons>
          <UpdatableTextInput
            placeHolder="Phone"
            onChangeText={setPhone}
            value={phone}
          ></UpdatableTextInput>
        </View>

        <View style={styles.address_container}>
          <Ionicons name="home"></Ionicons>
          <UpdatableTextInput
            placeHolder="Address"
            onChangeText={setAddress}
            value={address}
          ></UpdatableTextInput>



        </View>
        <TouchableOpacity onPress={() => onSaveProfilePress()}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.comments_title_container}>
        <Text style={styles.comments_title}>Comments</Text>
      </View>

      <View style={styles.comments_container}>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.comments_container}>
              <Text style={styles.commentName}>{item.name}</Text>
              <Text style={styles.commentContent}>{item.content}</Text>
              <Text style={styles.commentDate}>{item.date}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default ProfileManagementScreen;
