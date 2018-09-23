import React from 'react';
import moment from 'moment';

const LogTableRow = ({
  id, type, step, lambdaURL, cloudURL, status, elapsedTime, timestamp,
}) => (
  <tr className="log__table-row">
    <td className="log__table-row-id">{id}</td>
    <td className="log__table-row-type">{type}</td>
    <td className="log__table-row-step">{step || '-'}</td>
    <td className="log__table-row-resource">
      {lambdaURL ? (
        <div>
          <a href={lambdaURL} className="log__table-row-link">
            Lambda
          </a>{' '}
          |{' '}
          <a href={cloudURL} className="log__table-row-link">
            Cloudwatch
          </a>
        </div>
      ) : (
        '-'
      )}
    </td>
    <td className="log__table-row-elapsed-time">{elapsedTime}</td>
    <td className="log__table-row-timestamp">
      {moment(timestamp).format('MMM DD, YYYY hh:mm:ss:SSS A')}
    </td>
  </tr>
);

export default LogTableRow;
