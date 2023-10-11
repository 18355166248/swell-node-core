import { calculateSizeDirs } from './calculateSizeDirs'
import { getDirectorySize } from './getDirectorySize'

jest.mock('./getDirectorySize')

describe('calculateSizeDirs', () => {
  it('计算文件夹大小和总和', () => {
    (getDirectorySize as jest.Mock).mockImplementation((path) => {
      switch (path) {
        case 'path1':
          return 100
        case 'path2':
          return 200
        default:
          return 0
      }
    })

    const { entires, totalSize } = calculateSizeDirs({ dirs: ['path1', 'path2'] })
    expect(entires).toEqual([{
      path: 'path1',
      size: 100
    }, {
      path: 'path2',
      size: 200
    }])
    expect(totalSize).toBe(300)
  })
})
