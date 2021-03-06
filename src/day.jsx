import moment from "moment";
import React from "react";
import classnames from "classnames";
import { isSameDay, isDayDisabled } from "./date_utils";

var Day = React.createClass({
  displayName: "Day",

  propTypes: {
    day: React.PropTypes.object.isRequired,
    month: React.PropTypes.number,
    onClick: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    includeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    selected: React.PropTypes.object,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object
  },

  handleClick(event) {
    if (!this.isDisabled() && this.props.onClick) {
      this.props.onClick(event);
    }
  },

  isSameDay(other) {
    return isSameDay(this.props.day, other);
  },

  isDisabled() {
    return isDayDisabled(this.props.day, this.props);
  },

  isInRange() {
    const { day, startDate, endDate } = this.props;
    if (!startDate || !endDate) return false;

    const before = startDate.clone().startOf("day").subtract(1, "seconds");
    const after = endDate.clone().startOf("day").add(1, "seconds");
    return day.clone().startOf("day").isBetween(before, after);
  },

  isWeekend() {
    const weekday = this.props.day.weekday();
    return weekday === 5 || weekday === 6;
  },

  isOutsideMonth() {
    return this.props.month !== undefined &&
      this.props.month !== this.props.day.month();
  },

  getClassNames() {
    return classnames("datepicker__day", {
      "datepicker__day--disabled": this.isDisabled(),
      "datepicker__day--selected": this.isSameDay(this.props.selected),
      "datepicker__day--in-range": this.isInRange(),
      "datepicker__day--today": this.isSameDay(moment()),
      "datepicker__day--weekend": this.isWeekend(),
      "datepicker__day--outside-month": this.isOutsideMonth()
    });
  },

  render() {
    return (
      <div className={this.getClassNames()} onClick={this.handleClick}>
        {this.props.day.date()}
      </div>
    );
  }
});

module.exports = Day;
