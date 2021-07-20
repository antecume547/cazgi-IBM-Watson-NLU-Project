import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
		let li_ctr = 0;
	    let emoArray = Object.entries(this.props.emotions);
      return (  
        <div>
	      <br></br>
	      <br></br>
          <table className="table table-bordered">
            <tbody>
            
               
                {emoArray.map(function(emotion){
                    return <tr key={li_ctr++}><td>{emotion[0]}</td>
				<td>{emotion[1]}</td></tr>;
                  })}
	      </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
