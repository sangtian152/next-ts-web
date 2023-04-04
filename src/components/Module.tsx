import type { PropsWithChildren } from "react"
import cx from 'classnames'
import Title from "./Title"
import { subtle } from "crypto";

interface ModuleProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  block?:boolean;
}

const Module: React.FC<ModuleProps> = (props) => {
  const { block, title, subtitle } = props
  return (<div className={cx({"app-module":true, "pg_width": !block, "no-pd": block})}>
    <Title title={title} subtitle={subtitle} />
    <div className={cx({"app-module__main": true})}>
      {props.children}
    </div>
  </div>)
}

export default Module