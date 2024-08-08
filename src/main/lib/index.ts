import { appDirName, fileEnconding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote } from '@shared/types'
import { ensureDir, readdir, readFile, stat } from 'fs-extra'
import { homedir } from 'os'

export const getRouteDir = () => {
  return `${homedir()}/${appDirName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRouteDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEnconding,
    withFileTypes: false
  })

  // Verifica todos os arquivos dentro do diretório passado como parâmetro

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  // Filtra todos os arquivos que terminam com .md

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRouteDir()}/${fileName}`)
  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRouteDir()

  return readFile(`${rootDir}/${fileName}.md`, {
    encoding: fileEnconding
  })
}
