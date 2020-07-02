import React from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
import MessageTile from './MessageTile'


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