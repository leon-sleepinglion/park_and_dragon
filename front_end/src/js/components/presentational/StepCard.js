import React from 'react'
import {
  Card,
  Steps,
  Badge,
  Popover
} from 'antd'

const { Step } = Steps

export default ({
                  title,
                  currentStep,
                  currentPopoverContentTitle,
                  currentPopoverContentStatus,
                  currentPopoverContentValue,
                  contents,
                  ...rest
                }) => {

  const popoverContent = (
    <div style={ { width: 160 } }>
      { currentPopoverContentTitle }
      <span style={ { float: 'right', color: 'rgba(0,0,0,0.45)' } }>
      <Badge status="default"
             text={ <span style={ { color: 'rgba(0,0,0,0.45)' } }>{ currentPopoverContentStatus }</span> }/>
    </span>
      <div style={ { marginTop: 4, color: 'rgba(0,0,0,0.45)' } }>
        { currentPopoverContentValue }
      </div>
    </div>
  );

  const customDot = (dot, { status }) =>
    status === 'process' ? (
      <Popover placement="topLeft" arrowPointAtCenter content={ popoverContent }>
        { dot }
      </Popover>
    ) : (
      dot
    );

  return (
    <Card title={ title } { ...rest }>
      <Steps direction={ 'horizontal' } progressDot={ customDot } current={ currentStep }>
        {
          contents && contents.map((item, index) => (
            item.desc ?
              <Step title={ item.title } description={ item.desc } key={ `step${index}` }/>
              : <Step title={ item.title } key={ `step${index}` }/>
          ))
        }
      </Steps>
    </Card>
  )
}