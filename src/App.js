import React, { PureComponent } from "react";
// import { makeStyles } from "@material-ui/core/styles";

export default class App extends PureComponent {

  state = {
    isFlipped: Array(6).fill(false),
    shuffledCard: App.countryCapital().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1
  };

  static countryCapital = () => {
    return [
      { code: 1, name: "Germany" },
      { code: 1, name: "Berlin" },
      { code: 2, name: "Azerbaijan" },
      { code: 2, name: "Baku" },
      { code: 3, name: "china" },
      { code: 3, name:"beijing" }
    ];
  };

  handleClick = (event) => {
    console.log(event)
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
      prevSelectedCard: this.state.shuffledCard[cardId],
      prevCardId: cardId
    });

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState((prevState) => ({
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1.code === card2.code) {
     
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
    
        this.setState((prevState) => ({
          shuffledCard: hideCard
        }));
     
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState((prevState) => ({ isFlipped: flipBack }));
      }, 500);
    }
  };

  isGameOver = () => {
    return this.state.isFlipped.every(
      (element, index, array) => element !== false
    );
  };
  render() {
    return (
      
      <div>
        
        {this.isGameOver() ? (
          <div>Congratulations</div>
        ) : (
          <div className="grid-container">
            {this.state.shuffledCard.map((cardNumber, index) => (
            <button key={index} id={index} onClick={this.handleClick} style={cardNumber === -1 ? { display: 'none' } : this.state.isFlipped[index] ? this.state.clickCount === 2 ? { background: 'blue' } : { background: 'red' }:{background:'none', margin:'5px'}}  >
                {cardNumber.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

