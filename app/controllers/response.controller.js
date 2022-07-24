const db = require('../models');

const Responses = db.responses.Responses;
const Results = db.responses.Results;

exports.saveResponses = async (req, res) => {
  const data = req.body.responses
  Responses.insertMany(data).then(
    result => {
      res.status(200).send({
        message: 'Success',
        result
      })
    },
    error => {
      res.status(500).send({
        message: 'Error',
        error
      })
    }
  )
}

const calculateRawScore = (listening = 0, structure = 0, reading = 0) => {
  return parseInt(listening) + parseInt(structure) + parseInt(reading);
}

const scaleListen = (listening = 0) => {
  let score = (listening / 30) * 50
  if (score < 20) {
    score = 20
    return score
  }
  return score
}

const scaleStructure = (structure = 0) => {
  let score = (structure / 25) * 50
  if (score < 20) {
    score = 20
    return score
  }
  return score
}

const scaleRead = (reading = 0) => {
  let score = (reading / 40) * 50
  if (score < 20) {
    score = 20
    return score
  }
  return score
}

const scaleTotal = (listen, structure, read) => {
  const scaleTotal = listen + structure + read;
  const score = Math.floor((scaleTotal * 10)/3);
  return score;
}

exports.saveNestedResponses = async (req, res) => {
  const filter = {
    userId: req.body.userId,
    examId: req.body.examId
  };
  const responseData = req.body.responses;
  const update = {
    listeningRaw: req.body.listeningRaw,
    structureRaw: req.body.structureRaw,
    readingRaw: req.body.readingRaw,
    responses: responseData
  }

  try {
    const result = await Results.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    })
    const rawScore = calculateRawScore(result.listeningRaw, result.structureRaw, result.readingRaw)
    const listenScaled = scaleListen(result.listeningRaw)
    const structureScaled = scaleStructure(result.structureRaw)
    const readingScaled = scaleRead(result.readingRaw)
    const totalScale = scaleTotal(listenScaled, structureScaled, readingScaled)
    const updateScore = {
      totalRaw: rawScore,
      listeningScaled: listenScaled,
      structureScaled: structureScaled,
      readingScaled: readingScaled,
      totalScaled: totalScale 
    }
    const result2 = await Results.findOneAndUpdate(filter, updateScore, {
      new: true,
      upsert: true
    })
    return res.status(200).send({
      message: 'Success',
      results: result,
      updated: result2,
      raw: rawScore
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Failed',
      error
    })
  }
}