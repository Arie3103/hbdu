import React, { Component } from "react";
import reactCSS from "reactcss";
import Confetti from 'react-confetti'

import "./App.css";
import "./cake.css";

class App extends Component {
  static defaultProps = {
    ucapan: [
      "Semoga panjang umur",
      "Diberikan rejeki yg melimpah",
      "Sehat selalu, kurang2in bucin wkwkkw",
      "Sayang orang tua, sayang semuanya",
    ], //edit untuk kata2
    panggilan: ["Kawan", "Teman", "Lek", "Lekk"], //edit untuk panggilan
    tanggal_lahir: "30/12/2001", //untuk edit tanggal lahir doi kau
    nama: "Merr", //edit untuk nama di ballon, maksimal 5 kata aja xixixi
    warna: [
      "#FF6900",
      "#FCB900",
      "#7BDCB5",
      "#00D084",
      "#8ED1FC",
      "#0693E3",
      "#ABB8C3",
      "#EB144C",
      "#F78DA7",
    ], //edit untuk plihan warna random
  };

  constructor(props) {
    super(props);
    this.state = {
      bgcolor: "#000000",
      displayColorPicker: false,
      text: "",
      isDeleting: false,
      loopNum: 0,
      typingSpeed: 150,
      nama: [],
      confetti: true,
    };
  }

  componentDidMount() {
    //localStorage.setItem('bgcolor', '#333');
    //localStorage.getItem('bgcolor')
    //localStorage.getItem('bgcolor') == '#000' ? console.log('hitam') : null
    //this.mengetik();
    this.getwaktu();
    this.setState({
      panggilan: this.props.panggilan[
        Math.floor(Math.random() * this.props.panggilan.length)
      ],
      tgl_lahir: this.props.tanggal_lahir.split("/")[0],
      bln_lahir: this.props.tanggal_lahir.split("/")[1],
      nama: this.props.nama.split(""),
    });
  }

  gantiwarna = () => {
    //this.setState({ displayColorPicker: !this.state.displayColorPicker });
    this.mengetik();
    this.confetti();
    this.setState({
      bgcolor: this.props.warna[
        Math.floor(Math.random() * this.props.warna.length)
      ],
    });
  };

  getwaktu = () => {
    setInterval(() => {
      var greeting;
      var today = new Date();
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      var date = today.getDate() + "/" + parseInt(today.getMonth() + 1);
      if (hours >= 18) {
        greeting = "Evening";
      }
      if (hours >= 15) {
        greeting = "Afternoon";
      }
      if (hours >= 11) {
        greeting = "Day";
      }
      if (hours >= 5) {
        greeting = "Morning";
      }
      if (hours >= 0) {
        greeting = "Night";
      }
      this.setState({
        curdate: hours + ":" + min + ":" + sec,
        greeting: greeting,
        date: date,
      });
    }, 1000);
  };

  confetti = () => {
    setTimeout(()=>{
      const { confetti } = this.state
      this.setState({
        confetti: false,
      })
    },3000)
  }

  mengetik = () => {
    const { ucapan } = this.props;
    const { isDeleting, loopNum, text, typingSpeed } = this.state;
    const i = loopNum % ucapan.length;
    const fullText = ucapan[i];

    this.setState({
      text: isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? 30 : 150,
    });

    if (!isDeleting && text === fullText) {
      setTimeout(() => this.setState({ isDeleting: true }), 500);
    } else if (isDeleting && text === "") {
      this.setState({
        isDeleting: false,
        loopNum: loopNum + 1,
      });
    }

    setTimeout(this.mengetik, typingSpeed);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          //background: `${localStorage.getItem('bgcolor')}`,
          background: `${this.state.bgcolor}`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div
        className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"
        style={{
          //backgroundColor: localStorage.getItem("bgcolor"),
          backgroundColor: this.state.bgcolor,
          transition: "all .7s ease",
          WebkitTransition: "all .7s ease",
          MozTransition: "all .7s ease",
        }}
      >
        <header className="masthead mb-auto">
          <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className="navbar-brand">
              <div style={styles.swatch} onClick={this.gantiwarna}>
                <div style={styles.color} />
              </div>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              {this.state.date + "/" + new Date().getFullYear()}
            </div>
          </nav>
        </header>

        <main role="main" className="inner">
          <div>
            {this.state.bgcolor !== "#000000" ? (
              <div>
              <Confetti 
                numberOfPieces={300}
                recycle={false}
              />
                <div>
                  <h2>Happy Birthday {this.state.panggilan}</h2>
                  <h3>
                    {this.state.text}
                    <span id="cursor" />
                  </h3>
                </div>
                <div class="container">
                  <div
                    className={
                      this.state.bgcolor !== "#000000"
                        ? "balloon"
                        : "balloon hidden"
                    }
                  >
                    <div>
                      <span>♥</span>
                    </div>
                    {this.state.nama.map((nama) => (
                      <div>
                        <span>{nama}</span>
                      </div>
                    ))}
                    <div>
                      <span>♥</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3>Please turn on the lamp</h3>
              </div>
            )}
            <div class="cake">
              <div class="plate"></div>
              <div class="layer layer-bottom"></div>
              <div class="layer layer-middle"></div>
              <div class="layer layer-top"></div>
              <div class="icing"></div>
              <div class="drip drip1"></div>
              <div class="drip drip2"></div>
              <div class="drip drip3"></div>
              <div class="candle">
                {this.state.bgcolor !== "#000000" ? (
                  <div
                    className={
                      this.state.bgcolor !== "#000000"
                        ? "flame"
                        : "flame hidden"
                    }
                  ></div>
                ) : null}
              </div>
            </div>
          </div>
        </main>
        <footer className="mastfoot mt-auto">
          <div className="inner"></div>
        </footer>
      </div>
    );
  }
}

export default App;
