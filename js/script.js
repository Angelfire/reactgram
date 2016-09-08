import '../styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { data } from './settings.json';

// Components
import ImageBG from './components/ImageBG';

// App Container
class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    var value = e.target.value;
    var name = e.target.id;

    switch (name) {
      case 'contrast':
      this.props.data.settings[0].value = value + '%';
      break;
      case 'hue':
      this.props.data.settings[1].value = value + 'deg';
      break;
      case 'brightness':
      this.props.data.settings[2].value = value + '%';
      break;
      case 'saturate':
      this.props.data.settings[3].value = value + '%';
      break;
      case 'sepia':
      this.props.data.settings[4].value = value + '%';
      break;
    }
    this.forceUpdate();
  }

  handleClick(e) {
    var index = e.target.id.replace('filter-','');

    this.props.data.settings[0].value = this.props.data.filters[index].settings[0].value;
    this.props.data.settings[1].value = this.props.data.filters[index].settings[1].value;
    this.props.data.settings[2].value = this.props.data.filters[index].settings[2].value;
    this.props.data.settings[3].value = this.props.data.filters[index].settings[3].value;
    this.props.data.settings[4].value = this.props.data.filters[index].settings[4].value;
    this.forceUpdate();
  }

  render() {
    return(
      <div className="app">
        <ImageBG image={this.props.data.image} />
        <Settings onClick={this.handleClick} onChange={this.handleChange} data={this.props.data} />
      </div>
    )
  }
}

App.defaultProps = { data };

// Settings Container
class Settings extends React.Component {
  render() {
    return (
      <div className="settings">
        <div className="main-wrapper">
          <Sidebar onChange={this.props.onChange} settings={this.props.data.settings} />
          <ImageContainer settings={this.props.data.settings} image={this.props.data.image} />
        </div>
        <FilterList onClick={this.props.onClick} filters={this.props.data.filters} image={this.props.data.image} />
      </div>
    )
  }
}

// Sidebar
class Sidebar extends React.Component {
  render() {
    var onChange = this.props.onChange;
    var settings = this.props.settings.map(function(setting, i) {
      return <Setting onChange={onChange} name={setting.name} key={setting.id} value={setting.value} />;
    });

    return (
      <div className="sidebar">
        <div className="title">Reactgram v1.0</div>
        {settings}
      </div>
    );
  }
}

// Setting
class Setting extends React.Component {
  render() {
    if(this.props.name == 'hue') {

      var value = this.props.value.replace('deg','');

      return (
        <div className="setting">
          <label><div>{this.props.name}</div><div>{value}</div></label>
          <input name={this.props.name} min="-360" max="360" step="1" onChange={this.props.onChange} id={this.props.name} type="range" defaultValue={this.props.value} />
        </div>
      );

    } else if(this.props.name == 'contrast' || this.props.name == 'brightness') {

      var value = this.props.value.replace('%','');

      return (
        <div className="setting">
          <label><div>{this.props.name}</div><div>{value}</div></label>
          <input name={this.props.name} min="0" max="200" step="1" onChange={this.props.onChange} id={this.props.name} type="range" defaultValue={this.props.value} />
        </div>
      );

    } else {

      var value = this.props.value.replace('%','');

      return (
        <div className="setting">
          <label><div>{this.props.name}</div><div>{value}</div></label>
          <input name={this.props.name} min="0" max="100" step="1" onChange={this.props.onChange} id={this.props.name} type="range" defaultValue={this.props.value} />
        </div>
      );
    }
  }
}

// Image Container
class ImageContainer extends React.Component {
  render() {
    return (
      <div className="image-container">
        <Image settings={this.props.settings} image={this.props.image} />
      </div>
    );
  }
}

// Image
class Image extends React.Component {
  render() {

    if(!this.props.settings == []) {
      var filterString = "";
      var filters = this.props.settings.map(function(filter, i) {

        if(filter.name == 'hue') {
          filterString = filterString + 'hue-rotate(' + filter.value + ') ';
        } else {
          filterString = filterString + filter.name + '(' + filter.value + ') ';
        }

        return filterString;
      });
    }

    var style = {
      backgroundImage: 'url(' + this.props.image + ')',
      WebkitFilter: filterString
    };

    if(!this.props.id) {
      var id = 'filter-image';
    } else {
      var id = this.props.id;
    }

    return (
      <div id={id} className="Image" style={style}></div>
    );
  }
}

// FilterList
class FilterList extends React.Component {
  render() {
    var image = this.props.image;
    var onClick = this.props.onClick;

    var filters = this.props.filters.map(function(filter, i) {
      return <Filter onClick={onClick} id={filter.id} key={filter.id} image={image} settings={filter.settings} />
    });

    return (
      <div className="filter-list">
      {filters}
      </div>
    );
  }
}

// Filter
class Filter extends React.Component {
  render() {
    return (
      <div className="filter" onClick={this.props.onClick}>
      <Image id={'filter-' + this.props.id} settings={this.props.settings} image={this.props.image} />
      </div>
    );
  }
}

// Render
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
