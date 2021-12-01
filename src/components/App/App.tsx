import * as React from "react";
import { Maze } from "../Maze/Maze";

import styles from "./App.scss";

export class App extends React.Component<{},{}>
{
    render()
    {
        return (
            <Maze width={20} height={20} size={26} />            
        );
    }
}