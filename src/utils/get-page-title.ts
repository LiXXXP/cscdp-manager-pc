// import defaultSettings from '../settings'

const title = '民政智慧云数字平台'

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
