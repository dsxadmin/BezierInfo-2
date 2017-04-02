var React = require('react');
var sections = require("./sections");
var sectionPages = Object.keys(sections);
var SectionHeader = require("./SectionHeader.jsx");

var Navigation = React.createClass({
  generateNavItem: function(name, entry) {
    var Type = sections[name];
    var title = Type.defaultProps.title;
    var locale = SectionHeader.locale;
    if (typeof window !== "undefined" && window.location.toString().indexOf(locale) === -1) {
      locale = '';
    }
    var fragmentid = `${locale ? './' + locale + '/': '.'}#${name}`;
    var link = <a href={fragmentid}>{ title }</a>;
    var last = sectionPages.length - 1;
    if (entry===last) entry = null;
    return <li key={name} data-number={entry}>{link}</li>;
  },

  generateNav: function() {
    return (
      <div ref="navigation">
        <navigation>
          <ul className="navigation">
            { sectionPages.map(this.generateNavItem) }
          </ul>
        </navigation>
      </div>
    );
  },

  render: function() {
    return this.generateNav();
  }
});

module.exports = Navigation;