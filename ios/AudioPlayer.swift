//
//  AudioPlayer.swift
//  Lune
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
  var playlist: Array<AVPlayerItem> = []
  var queuePlayer: AVQueuePlayer!
  var loadedTime: Double = 0.0
  
  @objc func loadPlaylist(_ audioURIs: Array<String>) {
    print("Loading playlist...")
    queuePlayer?.removeAllItems()
    playlist.removeAll()
    print("Removed all from queue player and playlist...")
    for uri in audioURIs {
      playlist.append(AVPlayerItem(asset: AVURLAsset(url: URL(string: uri)!)))
    }
    print("about to initialize avqueueplayer")
    DispatchQueue.global(qos: .userInitiated).async {
      self.queuePlayer = AVQueuePlayer(items: self.playlist)
    }
  }
  
  @objc func playAtIndex(_ index: Int) {
    queuePlayer.removeAllItems()
    for i in (index..<playlist.count) {
      if (queuePlayer.canInsert(playlist[i], after: nil)) {
        playlist[i].seek(to: kCMTimeZero)
        playlist[i].addObserver(self, forKeyPath:"status", options:.new, context:nil)
        playlist[i].addObserver(self, forKeyPath:"loadedTimeRanges", options:.new, context:nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.playerDidFinishPlaying(note:)),
                                               name: NSNotification.Name.AVPlayerItemDidPlayToEndTime, object: playlist[i])
        NotificationCenter.default.addObserver(
          forName: NSNotification.Name.AVPlayerItemFailedToPlayToEndTime,
          object: nil,
          queue: nil,
          using: { notification in
            print("Error during playing")
        })

        queuePlayer.insert(playlist[i], after: nil)
      }
    }
    queuePlayer.play()
  }
  
  @objc func play(_ uri: String) -> Void {
    let audioURL = URL(string: uri)!
    player = AVPlayer(url: audioURL)
    player.currentItem?.addObserver(self, forKeyPath:"status", options:.new, context:nil)
    player.currentItem?.addObserver(self, forKeyPath:"loadedTimeRanges", options:.new, context:nil)
    NotificationCenter.default.addObserver(self, selector: #selector(self.playerDidFinishPlaying(note:)),
                                           name: NSNotification.Name.AVPlayerItemDidPlayToEndTime, object: player.currentItem)
    NotificationCenter.default.addObserver(
      forName: NSNotification.Name.AVPlayerItemFailedToPlayToEndTime,
      object: nil,
      queue: nil,
      using: { notification in
        print("Error during playing")
    })
  }
  
  func playerDidFinishPlaying(note: NSNotification) {
    print("Audio finished playing")
  }
  
  override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
    switch keyPath {
      
    case .some("status"):
      if (queuePlayer.currentItem?.status == .unknown) {
        print("Unknown player item status")
      } else if (queuePlayer.currentItem?.status == .readyToPlay) {
        print("Ready to play...")
        queuePlayer.play()
      } else if (queuePlayer.currentItem?.status == .failed) {
        print("Failed to play song :(")
      } else {
        print("Unexpected player item status")
        print(queuePlayer.currentItem?.status ?? "bitch no status")
      }
      break;
      
    case .some("loadedTimeRanges"):
      var duration: Double = 0
      var loadedTimeRanges = queuePlayer.currentItem?.loadedTimeRanges
      if (loadedTimeRanges?.count)! > 0 {
        let timeRange: CMTimeRange = loadedTimeRanges![0].timeRangeValue
        let startSeconds: Double = CMTimeGetSeconds(timeRange.start)
        let durationSeconds: Double = CMTimeGetSeconds(timeRange.duration)
        duration = startSeconds + durationSeconds
      }
      print(duration)
      loadedTime = duration
      break;
      
    default:
      print("Unexpected key path:", keyPath ?? "No key path provided")
    }
  }
  
  @objc func pause() -> Void {
    player.pause()
  }
  
  func callback(_ finished : Bool) -> Void {
    print("Finished seeking: \(finished)")
  }
  
  @objc func seek(_ seconds: Int) -> Void {
    let preferredTimeScale : Int32 = (player.currentItem?.asset.duration.timescale)!
    let seektime = CMTimeMakeWithSeconds(Double(seconds), preferredTimeScale)
    player.seek(to: seektime, completionHandler: callback)
  }
  
}
