import React, {Component} from 'react';
import {
    Platform,
    Text,
    View
} from 'react-native';
import Style from './Style'
import InputButton from './InputButton'

const inputValue = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

export default class ReactCalculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}
                    </Text><InputButton style={Style.clearButton} onPress={this._deleteCharacter.bind(this)}
                                        value={'clr'} key={'clr'}/></View>
                <View style={Style.clearContainer}>
                    <InputButton key={"clear"} value={'Clear All'} onPress={this._clearInput.bind(this)}/>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButton()}
                </View>
            </View>
        )
    }

    _deleteCharacter() {
        var inputSet = this.state.inputValue
        if (this.state.inputValue > 0) {
            inputSet = parseInt(this.state.inputValue / 10);
        }
        this.setState({
            inputValue: inputSet
        });


    }

    _clearInput() {
        this.setState({
            selectedSymbol: null,
            previousInputValue: 0,
            inputValue: 0
        });
    }


    _renderInputButton() {
        let view = [];
        for (var r = 0; r < inputValue.length; r++) {
            let row = inputValue[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i++) {
                let input = row[i];

                inputRow.push(
                    <InputButton value={input} highlight={this.state.selectedSymbol === input}
                                 onPress={this._onInputButtonPressed.bind(this, input)}
                                 key={r + "-" + i}/>
                );
            }

            view.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>);
        }

        return view;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':

                return this._handleStringInput(input)
        }
        alert(input)
    }

    _handleNumberInput(input) {
        let inputValue = (this.state.inputValue * 10) + input;

        this.setState({
            inputValue: inputValue
        });
    }

    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '-':
            case '+':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });

                break;
            case '=':
                let symbol = this.state.selectedSymbol,
                    input = this.state.inputValue,
                    previousValue = this.state.previousInputValue;

                if (!symbol)
                    return;

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousValue + symbol + input),
                    selectedSymbol: null
                });
                break;
        }
    }
}