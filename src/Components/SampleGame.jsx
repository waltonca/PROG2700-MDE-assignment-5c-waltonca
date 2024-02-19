import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SampleGame = () => {
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  

  useEffect(() => {
    fetchPuzzleData();
  }, [reload]);

  const fetchPuzzleData = () => {
    axios.get('https://prog2700.onrender.com/threeinarow/sample').then((response) => {
      console.log(response.data.rows);
      setData(response.data.rows);
    });
  }

  const toggleCell = (target,cell) => {
    // Function logic for cycling through cell states
    // if all cells are correct, disable all cells and display a message
    if (cell.canToggle) {
        switch (cell.currentState) {
          case 0:
            cell.currentState = 1;
            target.classList.remove('state0');
            target.classList.add('state1');
            break;
          case 1:
            cell.currentState = 2;
            target.classList.remove('state1');
            target.classList.add('state2');
            break;
          case 2:
            cell.currentState = 0;
            target.classList.remove('state2');
            target.classList.add('state0');
            break;
          default:
            break;
        }
    }
    checkAnswer(cell);
  };

  const checkAnswer = (cell) => {
    if (cell.currentState === cell.correctState) {
      console.log('Correct answer!');
      
    } else {
      console.log('Incorrect answer!');
      
    }
  };

  const checkAllCorrect = () => {
    // Function logic to check if all cells are correct
    let allCorrect = true;

    // Loop through all cells and check if they are correct
    data.forEach(row => {
        row.forEach(cell => {
        if (cell.canToggle && cell.currentState !== cell.correctState) {
            allCorrect = false;
        }
        });
    });

    if (allCorrect) {
        document.getElementById('checkResult').innerHTML = 'puzzle is correct and complete!';
        disableAllCells();
        // change the style of each cell to show that it is correct
        // change state1 into a green background
        const table = document.querySelector('table');
        table.classList.add('correct');
    } else {
        document.getElementById('checkResult').innerHTML = 'puzzle is not correct!';
        
    }
  };

  const disableAllCells = () => {
    // Function logic to disable all cells
    const cells = document.querySelectorAll('.can-toggle');
    cells.forEach(cell => {
        cell.disabled = true;
    }
    );
  };

  const checkErrorDisplay = (showErrors) => {
    // if checkbox is checked, display errors and checkAllCorrect
    // if checkbox is unchecked, only checkAllCorrect
    const showErrorCheck = document.getElementById('showErrorCheck').checked;
    if(showErrorCheck) {
        console.log("display errors");
        const cells = document.querySelectorAll('.can-toggle');
        
        cells.forEach(cell => {
            const currentStateClass = Array.from(cell.classList).find(className => className.startsWith('state'));
        
            if (currentStateClass) {
                const currentState = parseInt(currentStateClass.replace('state', ''), 10);
        
                const correctState = parseInt(cell.getAttribute('correctstate'), 10);
        
                if (currentState !== correctState) {
                    cell.classList.add('error');
                    cell.value = 'X';
                } else {
                    cell.classList.remove('error');
                    cell.value = '';
                }
            } else {
                console.log('No state class found');
            }
        });
    }
    checkAllCorrect();
  };

  
  
  const reset = () => {
    // Function logic to reset the puzzle
    
    // clear error display
    document.getElementById('checkResult').innerHTML = '';
    // clear checkbox
    document.getElementById('showErrorCheck').checked = false;
    // reset input values
    const cells = document.querySelectorAll('.can-toggle');
    cells.forEach(cell => {
        cell.classList.remove('state1');
        cell.classList.remove('state2');
        cell.classList.add('state0');
        cell.value = '';
    });
    setReload(!reload);
  };

  const renderTable = () => {
    // Function logic to render the puzzle table based on 'data'
    
    return (
      <table>
        {data?.map((row) => (
          <tr>
            {row?.map((cell) => (
              <td className='cell'>
                <input
                    type='button'
                    className={`button ${cell.canToggle ? 'can-toggle' : 'cannot-toggle'} state${cell.currentState}`}
                    disabled={!cell.canToggle}
                    correctState={cell.correctState}
                    onClick={(e) => toggleCell(e.target, cell)}
                />
              </td>
            ))}
          </tr>
        ))}
      </table>
    );
  };
  
  return (
    <div>
        <h2 id="title">Sample Game</h2>
        <button id="btnReset" onClick={reset}>Reset</button>
        <div className="game-area">{renderTable()}</div>
        <label>
          Show Incorrect Squares{" "}
          <input
            type="checkbox"
            id="showErrorCheck"
          />
        </label>
        <button id="btnCheck" onClick={checkErrorDisplay}>Check</button>
        <div id="checkResult"></div>
    </div>
  );
};

export default SampleGame;
