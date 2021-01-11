import React, { Component } from 'react';
import "./App.css";
import Navbar from "./components/navbar";
import Counters from "./components/counters";


class App extends Component {
    state = {
        counters: [
            { id: 1, value: 4, },
            { id: 2, value: 0, },
            { id: 3, value: 0, },
            { id: 4, value: 0, }
        ]
    };

    deleteHandler = (counterId) => {
        const counters = this.state.counters.filter(c => c.id !== counterId)
        this.setState({ counters })

    }
    handleReset = () => {
        const counters = this.state.counters.map(c => {
            c.value = 0;
            return c;
        })
        this.setState({ counters })
    }

    incrementHandler = (counter) => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter)
        counters[index] = { ...counter };
        counters[index].value++;
        this.setState({ counters })

    }
    decrementHandler = (counter) => {
        console.log(counter);
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter)
        counters[index] = { ...counter };
        counters[index].value--;
        this.setState({ counters })
    }
    render() {
        return (
            <div>
                <Navbar
                    totalCounters={this.state.counters.filter(c => c.value > 0).length}
                ></Navbar>
                <main className="container">
                    <Counters
                        counters={this.state.counters}
                        onReset={this.handleReset}
                        onIncrement={this.incrementHandler}
                        onDelete={this.deleteHandler}
                        onDecrement={this.decrementHandler}
                    />
                </main>
            </div>);
    }
}

export default App;
