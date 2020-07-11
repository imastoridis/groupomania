//import React from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
import MessageTile from './MessageTile'
// app/routes/Homepage.js

import React, {Component} from 'react';

function HomePage() {
    return (
            <div className="App">
                <section id="main-container">
                    <Header />
                    <main>
                        <section id="message-list" className="">
                              <MessageTile/>
                        </section>
                    </main>
                    <Footer />
                </section>
            </div>
    )
}

export default HomePage;

/*
class HomePage extends Component {

    getProtectedQuote() {
        AsyncStorage.getItem('id_token').then((token) => {
          // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
          fetch('http://localhost:8080/api/users/login', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
          })
          .then((response) => response.text())
          .then((quote) => {
            Alert.alert('Chuck Norris Quote', quote)
          })
          .done();
        })
      }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/chuck_norris.png')} style={styles.image}/>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getProtectedQuote}>
          <Text style={styles.buttonText}> Get Chuck Norris quote! </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText} > Log out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomePage;*/


/*

/*
export default class Home extends Component {
    constructor(props) {
      super(props);

      this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
      //this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
      this.props.handleLogin(data);
      //this.props.history.push("/messages");
    }

render() {
    return (
            <div className="App">
                <section id="main-container">
                    <Header />
                    <main>
                        <section id="message-list" className="">
                              <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                        </section>
                    </main>
                    <Footer />
                </section>
            </div>
    )
}
}
*/