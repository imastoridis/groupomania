import React from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';



function UserProfile() {
    return (
            <body className="App">
                <section id="main-container">
                    <Header />
                    <main>
                        <section id="message-list" className="">
                              <p>profile</p>
                        </section>
                    </main>
                    <Footer />
                </section>  
            </body>
    )
}

export default UserProfile;