import type { PropsWithChildren, ReactNode } from "react"
import cx from 'classnames'

interface TitleProps extends PropsWithChildren {
  icon?:ReactNode;
  size?:string;
  title?: string;
  subtitle?: string;
}

const Title: React.FC<TitleProps> = (props) => {
  const { size, icon, title, subtitle } = props
  return title ? (<div className={cx(["app-mtitle", size])}>
    <div className='b_with_line app-mtitle__wrap'>
      <h3 className="app-mtitle__title">
        {title}
        <span className="app-mtitle__icon">{icon}</span>
      </h3>
      <p className="app-mtitle__subtitle">{subtitle}</p>
    </div>
  </div>) : null
}

export default Title