const daysMYSQL = `select
name as "nameQueue",
ROUND(AVG(sek)) as holdtime_sek,
ROUND(AVG(raznost)) as holdtime_min,
date,
noanswer,
answer,
noanswer + answer as total
from
(
    select
        sek,
        ROUND(sek / 60) as raznost,
        date,
        name
    from
        (
            select
                qs.info1 as sek,
                DATE(qs.datetime) as date,
                q.queue as name
            from
                queue_stats as qs,
                qname as q,
                qagent as ag,
                qevent as ac
            where
                qs.qname = q.queue_id
                and qs.qagent = ag.agent_id
                and qs.qevent = ac.event_id
                and DATE(qs.datetime) = str_to_date(
                    :date,
                    '%Y-%m-%d'
                )
                and ag.agent != 'NONE'
                and q.queue = :nameQueue
                and ac.event in (
                    'ABANDON', 'EXITWITHTIMEOUT', 'COMPLETECALLER', 'COMPLETEAGENT', 'AGENTLOGIN', 'AGENTLOGOFF', 'AGENTCALLBACKLOGIN', 'AGENTCALLBACKLOGOFF'
                )
        ) as sek
) as result,
(
    select
        COUNT(queue_stats_id) as noanswer
    from
        queue_stats as qs,
        qname as q
    where
        qs.qname = q.queue_id
        and (
            qevent = 1
                or qevent = 13
        )
        and q.queue = :nameQueue
        and DATE(DATETIME) = str_to_date(
            :date,
            '%Y-%m-%d'
        )
) as noanswer,
  (
    select
        COUNT(queue_stats_id) as answer
    from
        queue_stats as qs,
        qname as q
    where
        qs.qname = q.queue_id
        and (
            qevent = 9
                or qevent = 10
        )
        and q.queue = :nameQueue
        and DATE(DATETIME) = str_to_date(
            :date,
            '%Y-%m-%d'
        )
) as answer
group by
date,
noanswer,
answer,
noanswer + answer,
name`

const hoursMYSQL = `SELECT
  queue_stats.queue_stats_id,
  queue_stats.datetime,
  qname.queue as "nameQueue",
  qagent.agent,
  qevent.event,
  info1,
  info2,
  info3
FROM queue_stats
  JOIN qname ON queue_stats.qname = qname.queue_id
  JOIN qagent ON queue_stats.qagent = qagent.agent_id
  JOIN qevent ON queue_stats.qevent = qevent.event_id
WHERE
  DATE(queue_stats.datetime) = str_to_date(:date, '%Y-%m-%d')
  AND qname.queue = :nameQueue
  AND qevent.event IN ('ABANDON', 'EXITWITHTIMEOUT','COMPLETECALLER','COMPLETEAGENT','AGENTLOGIN','AGENTLOGOFF','AGENTCALLBACKLOGIN','AGENTCALLBACKLOGOFF')`

const hoursPG = ''

const daysPG = ''

const sql = {
  hoursMYSQL,
  daysMYSQL,
  hoursPG,
  daysPG
}

const getSql = (type, dbName) => {
  return sql[type + dbName]
}

module.exports = { getSql }
