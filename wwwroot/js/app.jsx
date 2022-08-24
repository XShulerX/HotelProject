class Guest extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.guest };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <div>
            <p><b>{this.state.data.name}</b></p>
            <p>Комната {this.state.data.room}</p>
        </div>;
    }
}

class GuestForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", room: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onRoomChange = this.onRoomChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onRoomChange(e) {
        this.setState({ room: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var guestName = this.state.name.trim();
        var guestRoom = this.state.room

        if (!guestName || !guestRoom || guestName.length > 10) {
            return;
        }
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (format.test(guestName)) {
            return;
        }
        this.props.onGuestSubmit({ name: guestName, room: guestRoom });
        this.setState({ name: "", room:""  });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Имя гостя"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="number"
                        placeholder="Номер комнаты"
                        value={this.state.room}
                        onChange={this.onRoomChange} />
                </p>
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}


class GuestsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { guests: [] };

        this.onAddGuest = this.onAddGuest.bind(this);
    }

    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ guests: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    // добавление объекта
    onAddGuest(guest) {
        if (guest) {
            const data = new FormData();
            data.append("name", guest.name);
            data.append("room", guest.room);
            var xhr = new XMLHttpRequest();

            xhr.open("post", this.props.apiUrl, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    render() {

        var remove = this.onRemoveGuest;
        return <div>
            <GuestForm onGuestSubmit={this.onAddGuest} />
            <h2>Список гостей</h2>
            <div>
                {
                    this.state.guests.map(function (guest) {
                        return <Guest key={guest.id} guest={guest} />
                    })
                }
            </div>
        </div>;
    }
}

ReactDOM.render(
    <GuestsList apiUrl="/api/guests" />,
    document.getElementById("content")
);