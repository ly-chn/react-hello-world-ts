import React from "react";

interface Props {
    value: String|null,

    onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

// class 方式
// export default class Square extends React.Component<SquareProps> {
//     render() {
//         return (
//             <button className="square"
//                     onClick={this.props.onClick}>
//                 {this.props.value}
//             </button>
//         )
//     }
// }

const Square = (props:Props)=>{
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default Square