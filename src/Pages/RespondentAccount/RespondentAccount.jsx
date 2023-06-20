import { Header } from "../../Components";
const RespondentAccount = () => {
    return (
        <main className="respondent__dash">
            <Header />
            <div className="dash__inner">
                <section className="dash__sidebar">
                    <div className="sidebar__personalInfo">
                        <h3>John Doe</h3>
                        <p>john.doe@gmail.com</p>
                    </div>
                    <h4>Settings</h4>
                    <div className="sidebar__settings">

                    </div>
                </section>
                <section className="dash_main">
                    <p>Hello, John</p>
                </section>
            </div>
        </main>
    )
}

export default RespondentAccount;