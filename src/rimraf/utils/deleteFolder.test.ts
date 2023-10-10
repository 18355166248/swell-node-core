import fs from 'fs'
import { deleteFolders } from './deleteFolders'
import { Entry } from './calculateSizeDirs'

jest.mock('fs', () => {
  const originalFS = jest.requireActual('fs')

  return {
    ...originalFS,
    promise: {
      ...originalFS.promise,
      rm: jest.fn()
    }
  }
})

afterEach(() => {
  jest.clearAllMocks();
});

describe('deleteFolders', () => {
  it('正确执行删除文件夹', async () => {
    const mockEntries = [
      'test/path', 'test3/path'
    ]

    await deleteFolders(mockEntries, 'path')

    expect(fs.promises.rm).toHaveBeenCalledTimes(2)

  })
})
