import classes from "./Header.module.css";


export default function Header() {
    return (
        <header className={classes.header_wrapper}>
            <h1 className={classes.header_text}>Simple post app</h1>
        </header>
    );
}