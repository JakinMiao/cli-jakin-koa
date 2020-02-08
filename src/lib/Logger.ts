import * as os from 'os'
import * as tracer from 'tracer'
import * as config from 'config'
import * as fs from 'fs'

const Logger = tracer.dailyfile({
  root: 'logs',
  // maxLogFiles: 10,
  allLogsFileName: config.get('application'),
  level: config.get('isProd') ? 'info' : 'debug',
  dateformat: 'yyyy-mm-dd HH:MM:ss.L',
  format: '{{timestamp}}|#|<{{title}}>|#|{{file}}:{{line}}|#|{{message}}',
  inspectOpt: {
    showHidden: false,
    depth: 3
  },
  transport: function (data) {
    data.server = os.hostname()
    console.log(data.output)
  }
})

export default Logger
