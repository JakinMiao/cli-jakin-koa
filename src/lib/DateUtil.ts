const _ = require('lodash')
const Moment = require('moment-timezone')

class DateUtil {
  constructor () {
    Moment.tz.setDefault('Asia/Kolkata')
  }

  /**
   * Get current time's Moment object with timezone
   *
   * @param {any} time
   * @return {Object} the Moment object
   */
  getCurrentMoment (time?) {
    return new Moment(time)
  }

  /**
   * Get current time of type Date
   *
   * @param {any} time
   * @return {Date} current time
   */
  getCurrentTime (time?) {
    return this.getCurrentMoment(time).toDate()
  }

  /**
   * Get current time of type timestamp
   *
   * @param {any} time
   */
  getCurrentTimestamp (time?) {
    return this.getCurrentMoment(time).valueOf()
  }

  formatTime (time?, format?) {
    return this.getCurrentMoment(time).format(format || 'YYYY-MM-DD')
  }

  getTimeFromFormat (date, format?) {
    return new Moment(date, format || 'YYYY-MM-DD')
  }

  /**
   * 取当天凌晨时间的时间戳
   * @param time 当前的时间
   * @returns {number}
   */
  getTodayStartTimestamp (time?) {
    return this.getCurrentMoment(time).startOf('day').valueOf()
  }

  getTodayEndTimestamp (time?) {
    return this.getCurrentMoment(time).endOf('day').valueOf()
  }

  getYestodayTime (time?) {
    return this.getCurrentMoment(time).subtract(1, 'days')
  }

  getTomorrowTime (time?) {
    return this.getCurrentMoment(time).add(1, 'days')
  }

  getYestodayStartTime (time?) {
    return this.getCurrentMoment(time).subtract(1, 'days').startOf('day').toDate()
  }

  getYestodayEndTime (time?) {
    return this.getCurrentMoment(time).subtract(1, 'days').endOf('day').toDate()
  }

  getXDaysAgoTime (days = 1, time?) {
    return this.getCurrentMoment(time).subtract(days, 'days').toDate()
  }

  getXDaysAgoStartTime (days = 1, time?) {
    return this.getCurrentMoment(time).subtract(days, 'days').startOf('day').toDate()
  }

  getXDaysAfterStartTime (days = 1, time?) {
    return this.getCurrentMoment(time).add(days, 'days').startOf('day').toDate()
  }

  getXDaysAgoEndTime (days = 1, time?) {
    return this.getCurrentMoment(time).subtract(days, 'days').endOf('day').toDate()
  }

  getXHoursAgo (hours = 1, time?) {
    return this.getCurrentMoment(time).subtract(hours, 'hours').toDate()
  }

  getXMinutesAgo (minutes = 1, time?) {
    return this.getCurrentMoment(time).subtract(minutes, 'minutes').toDate()
  }

  getXMinutesAfter (minutes = 1, time?) {
    return this.getCurrentMoment(time).add(minutes, 'minutes').toDate()
  }

  getXSecondsAgo (seconds = 1, time?) {
    return this.getCurrentMoment(time).subtract(seconds, 'seconds').toDate()
  }

  getXDaysAfter (days = 1, time?) {
    return this.getCurrentMoment(time).add(days, 'days').endOf('days').toDate()
  }

  getTodayStartTime (time?) {
    return this.getCurrentMoment(time).startOf('day').toDate()
  }

  getTodayStartMoment (time?) {
    return this.getCurrentMoment(time).startOf('day')
  }

  diff (startTime, endTime, type?) {
    const start = this.getCurrentMoment(startTime)
    const end = this.getCurrentMoment(endTime)
    const day = end.diff(start, type || 'days')
    return day
  }

  getTodayEndTime (time?) {
    return this.getCurrentMoment(time).endOf('day').toDate()
  }

  getTodayEndMoment (time?) {
    return this.getCurrentMoment(time).endOf('day')
  }

  getThisMonthStartTime () {
    return this.getCurrentMoment().startOf('month').toDate()
  }

  getThisMonthEndTime () {
    return this.getCurrentMoment().endOf('month').toDate()
  }

  getOneMonthRange (time) {
    const startTime = this.getCurrentMoment(time).subtract(1, 'months').toDate()
    const endTime = this.getCurrentMoment(time).toDate()
    return {'$gte': startTime, '$lte': endTime}
  }

  getXDayRange (range = 1, agoDays = 0, time?) {
    const date = this.getXDaysAgoTime(agoDays, time)
    return {
      $gte: this.getXDaysAgoTime(range, date),
      $lte: date
    }
  }

  getDaysDiff (start, end) {
    start = this.getTodayStartMoment(start)
    end = this.getTodayStartMoment(end)
    return end.diff(start, 'days')
  }

  isWorkDay (date = new Date()) {
    const days = [1, 2, 3, 4, 5]
    return _.includes(days, date.getDay())
  }

  isWorkTime () {
    const hour = this.getCurrentMoment().hours()
    return hour >= 9 && hour <= 20
  }
}

export default new DateUtil()
