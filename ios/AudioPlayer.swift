//
//  AudioPlayer.swift
//  lunatune
//
//  Created by Andrew Kwon on 4/3/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

/**
 *  AudioPlayer - Stream audio from a URI
 */

@objc(AudioPlayer)

class AudioPlayer: NSObject {
  
  var player: AVPlayer!

  @objc func play(uri: String) -> Void {
    let audioURL = NSURL(string: uri)!
    player = AVPlayer(URL: audioURL)
    player.play()
  }

  @objc func pause() -> Void {
    player.pause()
  }

  func callback(finished : Bool) -> Void {
    print("Finished seeking: \(finished)")
  }

  @objc func seek(seconds: Int) -> Void {
    let preferredTimeScale : Int32 = (player.currentItem?.asset.duration.timescale)!
    let seektime = CMTimeMakeWithSeconds(Double(seconds), preferredTimeScale)
    player.seekToTime(seektime, completionHandler: callback)
  }

}