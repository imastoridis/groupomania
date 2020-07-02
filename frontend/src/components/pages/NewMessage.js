import React from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
import MessageTile from './MessageTile'


function NewMessage() {
    return (
            <body className="App">
                <section id="main-container">
                    <Header />
                    <main>
                        <section id="message-list" className="">
                              <MessageTile/>
                        </section>
                    </main>
                    <Footer />
                </section>  
            </body>
    )
}

export default NewMessage;